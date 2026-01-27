import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Función para obtener el cliente S3 (lazy initialization)
let s3Client = null;

const getS3Client = () => {
  if (!s3Client) {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID2?.trim();
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY2?.trim();
    const region = (process.env.AWS_REGION2 || 'us-east-1').trim();

    // Debug: verificar que las credenciales estén presentes (sin mostrar valores completos)
    console.log('🔍 Verificando credenciales AWS...');
    console.log('AWS_ACCESS_KEY_ID2:', accessKeyId ? `${accessKeyId.substring(0, 8)}...` : 'NO ENCONTRADO');
    console.log('AWS_SECRET_ACCESS_KEY:', secretAccessKey ? '***CONFIGURADO***' : 'NO ENCONTRADO');
    console.log('AWS_REGION:', region);
    console.log('AWS_BUCKET_NAME:', process.env.AWS_BUCKET_NAME?.trim() || 'NO ENCONTRADO');

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('Las credenciales de AWS no están configuradas. Verifica las variables de entorno AWS_ACCESS_KEY_ID2 y AWS_SECRET_ACCESS_KEY2');
    }

    if (accessKeyId.length === 0 || secretAccessKey.length === 0) {
      throw new Error('Las credenciales de AWS están vacías. Verifica el archivo .env');
    }

    s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }
  return s3Client;
};

/**
 * Sube un archivo a S3
 * @param {Buffer} fileBuffer - Buffer del archivo
 * @param {string} originalName - Nombre original del archivo
 * @param {string} mimeType - Tipo MIME del archivo
 * @returns {Promise<string>} URL del archivo en S3
 */
export const uploadFileToS3 = async (fileBuffer, originalName, mimeType) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME?.trim();
    
    if (!bucketName) {
      throw new Error('AWS_BUCKET_NAME no está configurado en las variables de entorno');
    }

    const fileExtension = originalName.split('.').pop();
    const fileName = `diartec/${uuidv4()}.${fileExtension}`;

    console.log(`📤 Subiendo archivo a S3: ${fileName} (${(fileBuffer.length / 1024).toFixed(2)} KB)`);
    
    const client = getS3Client();
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
      // ACL removido - usar política de bucket en su lugar
    });

    await client.send(command);

    // Construir la URL pública del archivo
    const region = (process.env.AWS_REGION || 'us-east-1').trim();
    const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    
    console.log(`✅ Archivo subido exitosamente: ${fileUrl}`);
    
    return fileUrl;
  } catch (error) {
    console.error('❌ Error subiendo archivo a S3:', error);
    
    // Mensaje de error más descriptivo
    if (error.message.includes('credential') || error.message.includes('credentials')) {
      throw new Error(`Error de autenticación AWS: ${error.message}. Verifica que las credenciales en .env sean correctas.`);
    }
    
    throw new Error(`Error al subir archivo a S3: ${error.message}`);
  }
};

/**
 * Sube múltiples archivos a S3
 * @param {Array} files - Array de archivos (con buffer, originalname, mimetype)
 * @returns {Promise<Array>} Array de URLs de los archivos subidos
 */
export const uploadMultipleFilesToS3 = async (files) => {
  try {
    const uploadPromises = files.map(file => 
      uploadFileToS3(file.buffer, file.originalname, file.mimetype)
    );
    
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error subiendo múltiples archivos a S3:', error);
    throw error;
  }
};
