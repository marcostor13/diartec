import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD_EMAIL
  }
});

// Plantilla de correo para el cliente
const getClientEmailTemplate = (formData) => {
  const totalPrendas = Object.values(formData.sizes).reduce((a, b) => a + b, 0);
  const selectedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].filter(size => formData.sizes[size] > 0);
  
  let nombresHtml = '';
  if (selectedSizes.length > 0) {
    nombresHtml = selectedSizes.map(size => {
      const names = formData.namesBySize[size] || [];
      const numbers = formData.numbersBySize[size] || [];
      const quantity = formData.sizes[size];
      
      const itemsHtml = Array.from({ length: quantity }, (_, index) => {
        const name = names[index] || '';
        const number = numbers[index] || '';
        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${index + 1}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${name || '-'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${number || '-'}</td>
          </tr>
        `;
      }).join('');
      
      return `
        <div style="margin-bottom: 24px;">
          <h3 style="color: #FE8F19; font-size: 18px; font-weight: bold; margin-bottom: 12px;">
            Talla ${size} (${quantity} ${quantity === 1 ? 'polo' : 'polos'})
          </h3>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: center; font-weight: bold; color: #374151;">#</th>
                <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Nombre</th>
                <th style="padding: 12px; text-align: center; font-weight: bold; color: #374151;">Número</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
      `;
    }).join('');
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Pedido - Diartec</title>
</head>
<body style="margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px 30px; text-align: center;">
              <img src="https://ba-bucket-aws.s3.us-east-1.amazonaws.com/logo_diartec.png" alt="Diartec Logo" style="max-height: 60px; margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 900;">
                <span style="color: #ffffff;">DIAR</span><span style="color: #FE8F19;">TEC</span>
              </h1>
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 30px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: #FE8F19; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 40px;">✓</span>
              </div>
              <h2 style="margin: 0 0 10px; color: #1f2937; font-size: 28px; font-weight: bold;">¡Pedido Confirmado!</h2>
              <p style="margin: 0; color: #6b7280; font-size: 16px;">Gracias por confiar en Diartec</p>
            </td>
          </tr>
          
          <!-- Order Details -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb;">
                <h3 style="margin: 0 0 20px; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #FE8F19; padding-bottom: 10px;">
                  Detalles del Pedido
                </h3>
                
                <div style="margin-bottom: 20px;">
                  <p style="margin: 8px 0; color: #374151; font-size: 15px;">
                    <strong style="color: #1f2937;">Cliente:</strong> ${formData.name}
                  </p>
                  <p style="margin: 8px 0; color: #374151; font-size: 15px;">
                    <strong style="color: #1f2937;">Email:</strong> ${formData.email}
                  </p>
                  <p style="margin: 8px 0; color: #374151; font-size: 15px;">
                    <strong style="color: #1f2937;">Teléfono:</strong> ${formData.phone}
                  </p>
                  <p style="margin: 8px 0; color: #374151; font-size: 15px;">
                    <strong style="color: #1f2937;">Total de Prendas:</strong> 
                    <span style="color: #FE8F19; font-weight: bold; font-size: 18px;">${totalPrendas}</span>
                  </p>
                </div>
                
                ${nombresHtml ? `
                <div style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #e5e7eb;">
                  <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 18px; font-weight: bold;">
                    Nombres y Números de Impresión
                  </h3>
                  ${nombresHtml}
                </div>
                ` : ''}
                
                ${formData.observations ? `
                <div style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #e5e7eb;">
                  <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 18px; font-weight: bold;">
                    Observaciones
                  </h3>
                  <p style="margin: 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
                    ${formData.observations}
                  </p>
                </div>
                ` : ''}
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #111827; padding: 30px; text-align: center; border-top: 4px solid #FE8F19;">
              <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                <strong style="color: #ffffff;">DIAR<span style="color: #E21012;">TEC</span></strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Especialistas en personalización y acabados de prendas textiles
              </p>
              <p style="margin: 15px 0 0; color: #9ca3af; font-size: 12px;">
                Lima, Perú | ventas@diartec.com
              </p>
              <p style="margin: 20px 0 0; color: #6b7280; font-size: 11px;">
                &copy; ${new Date().getFullYear()} Diartec Perú. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Plantilla de correo para Diartec
const getDiartecEmailTemplate = (formData) => {
  const totalPrendas = Object.values(formData.sizes).reduce((a, b) => a + b, 0);
  const selectedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].filter(size => formData.sizes[size] > 0);
  
  let tallasHtml = selectedSizes.map(size => {
    const quantity = formData.sizes[size];
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: bold; color: #FE8F19;">${size}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${quantity}</td>
      </tr>
    `;
  }).join('');
  
  let nombresHtml = '';
  if (selectedSizes.length > 0) {
    nombresHtml = selectedSizes.map(size => {
      const names = formData.namesBySize[size] || [];
      const numbers = formData.numbersBySize[size] || [];
      const quantity = formData.sizes[size];
      
      const itemsHtml = Array.from({ length: quantity }, (_, index) => {
        const name = names[index] || '';
        const number = numbers[index] || '';
        return `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${index + 1}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${name || '-'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${number || '-'}</td>
          </tr>
        `;
      }).join('');
      
      return `
        <div style="margin-bottom: 24px;">
          <h3 style="color: #FE8F19; font-size: 18px; font-weight: bold; margin-bottom: 12px;">
            Talla ${size} (${quantity} ${quantity === 1 ? 'polo' : 'polos'})
          </h3>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: center; font-weight: bold; color: #374151;">#</th>
                <th style="padding: 12px; text-align: left; font-weight: bold; color: #374151;">Nombre</th>
                <th style="padding: 12px; text-align: center; font-weight: bold; color: #374151;">Número</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
      `;
    }).join('');
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Pedido - Diartec</title>
</head>
<body style="margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px 30px; text-align: center;">
              <img src="https://ba-bucket-aws.s3.us-east-1.amazonaws.com/logo_diartec.png" alt="Diartec Logo" style="max-height: 60px; margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 900;">
                <span style="color: #ffffff;">DIAR</span><span style="color: #FE8F19;">TEC</span>
              </h1>
            </td>
          </tr>
          
          <!-- Alert -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #FEF3C7;">
              <h2 style="margin: 0; color: #92400E; font-size: 24px; font-weight: bold;">⚠️ Nuevo Pedido Recibido</h2>
              <p style="margin: 10px 0 0; color: #78350F; font-size: 16px;">Se ha recibido un nuevo pedido que requiere atención</p>
            </td>
          </tr>
          
          <!-- Order Details -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
                <h3 style="margin: 0 0 20px; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #FE8F19; padding-bottom: 10px;">
                  Información del Cliente
                </h3>
                
                <div style="margin-bottom: 20px;">
                  <p style="margin: 8px 0; color: #374151; font-size: 15px;">
                    <strong style="color: #1f2937;">Nombre:</strong> ${formData.name}
                  </p>
                  <p style="margin: 8px 0; color: #374151; font-size: 15px;">
                    <strong style="color: #1f2937;">Email:</strong> 
                    <a href="mailto:${formData.email}" style="color: #FE8F19; text-decoration: none;">${formData.email}</a>
                  </p>
                  <p style="margin: 8px 0; color: #374151; font-size: 15px;">
                    <strong style="color: #1f2937;">Teléfono:</strong> 
                    <a href="tel:${formData.phone}" style="color: #FE8F19; text-decoration: none;">${formData.phone}</a>
                  </p>
                </div>
              </div>
              
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
                <h3 style="margin: 0 0 20px; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #FE8F19; padding-bottom: 10px;">
                  Resumen del Pedido
                </h3>
                
                <p style="margin: 0 0 16px; color: #374151; font-size: 15px;">
                  <strong style="color: #1f2937;">Total de Prendas:</strong> 
                  <span style="color: #FE8F19; font-weight: bold; font-size: 20px;">${totalPrendas}</span>
                </p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                  <thead>
                    <tr style="background: #f3f4f6;">
                      <th style="padding: 12px; text-align: center; font-weight: bold; color: #374151; border-bottom: 2px solid #e5e7eb;">Talla</th>
                      <th style="padding: 12px; text-align: center; font-weight: bold; color: #374151; border-bottom: 2px solid #e5e7eb;">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tallasHtml}
                  </tbody>
                </table>
              </div>
              
              ${nombresHtml ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 20px; font-weight: bold; border-bottom: 2px solid #FE8F19; padding-bottom: 10px;">
                  Nombres y Números de Impresión
                </h3>
                ${nombresHtml}
              </div>
              ` : ''}
              
              ${formData.observations ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb;">
                <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 18px; font-weight: bold;">
                  Observaciones del Cliente
                </h3>
                <p style="margin: 0; color: #6b7280; font-size: 15px; line-height: 1.6; background: white; padding: 16px; border-radius: 8px;">
                  ${formData.observations}
                </p>
              </div>
              ` : ''}
              
              ${formData.files && formData.files.length > 0 ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #e5e7eb; margin-top: 24px;">
                <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 18px; font-weight: bold;">
                  Archivos Adjuntos
                </h3>
                <p style="margin: 0; color: #6b7280; font-size: 15px;">
                  El cliente ha adjuntado <strong>${formData.files.length}</strong> ${formData.files.length === 1 ? 'archivo' : 'archivos'}.
                  <br>Revisa el sistema para ver los archivos subidos.
                </p>
              </div>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #111827; padding: 30px; text-align: center; border-top: 4px solid #FE8F19;">
              <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                <strong style="color: #ffffff;">DIAR<span style="color: #E21012;">TEC</span></strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Sistema de Gestión de Pedidos
              </p>
              <p style="margin: 15px 0 0; color: #6b7280; font-size: 11px;">
                &copy; ${new Date().getFullYear()} Diartec Perú. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Endpoint para enviar correos
app.post('/api/send-email', async (req, res) => {
  try {
    const { formData } = req.body;

    if (!formData || !formData.email || !formData.name) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Enviar correo al cliente
    const clientMailOptions = {
      from: `"Diartec" <${process.env.USER_EMAIL}>`,
      to: formData.email,
      subject: 'Confirmación de Pedido - Diartec',
      html: getClientEmailTemplate(formData)
    };

    // Enviar correo a Diartec
    const diartecMailOptions = {
      from: `"Sistema Diartec" <${process.env.USER_EMAIL}>`,
      to: process.env.DIARTEC_EMAIL,
      subject: `Nuevo Pedido de ${formData.name} - Diartec`,
      html: getDiartecEmailTemplate(formData)
    };

    // Enviar ambos correos
    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(diartecMailOptions)
    ]);

    res.json({ 
      success: true, 
      message: 'Correos enviados correctamente' 
    });
  } catch (error) {
    console.error('Error enviando correos:', error);
    res.status(500).json({ 
      error: 'Error al enviar los correos', 
      details: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
