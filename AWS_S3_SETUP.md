# Configuración de AWS S3 para Diartec

## Problema: AccessControlListNotSupported

El bucket de S3 no permite ACLs (Access Control Lists). Esto es común en buckets nuevos de AWS. La solución recomendada es usar **políticas de bucket** en lugar de ACLs.

## Solución: Configurar Política de Bucket

### Paso 1: Acceder a la Consola de AWS S3

1. Inicia sesión en la [Consola de AWS](https://console.aws.amazon.com/)
2. Navega a **S3** en el menú de servicios
3. Selecciona el bucket `promotores-s3`

### Paso 2: Configurar Permisos del Bucket

1. Ve a la pestaña **"Permissions"** (Permisos)
2. Desplázate hasta la sección **"Bucket policy"** (Política del bucket)
3. Haz clic en **"Edit"** (Editar)

### Paso 3: Agregar Política de Bucket

Copia y pega la siguiente política JSON. Esta política permite:
- **Lectura pública** de archivos en `diartec/` (para que las URLs sean accesibles)
- **Escritura** solo desde la aplicación (usando las credenciales IAM)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::promotores-s3/diartec/*"
    },
    {
      "Sid": "AllowPutObjectFromApp",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::TU_ACCOUNT_ID:user/TU_IAM_USER"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::promotores-s3/diartec/*"
    }
  ]
}
```

**Versión Simplificada (si ya tienes credenciales IAM configuradas):**

Si ya tienes las credenciales IAM configuradas (AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY), puedes usar esta versión más simple que solo permite lectura pública:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::promotores-s3/diartec/*"
    }
  ]
}
```

**Nota:** 
- Reemplaza `promotores-s3` con el nombre de tu bucket si es diferente
- La escritura (PutObject) se maneja mediante las credenciales IAM, no necesita estar en la política pública
- **NO incluyas** `s3:PutObjectAcl` porque el bucket no permite ACLs

### Paso 4: Configurar Block Public Access (si es necesario)

1. En la misma pestaña **"Permissions"**, busca la sección **"Block public access (bucket settings)"**
2. Haz clic en **"Edit"**
3. **Desmarca** la opción:
   - ✅ **"Block public access to buckets and objects granted through new access control lists (ACLs)"**
4. Guarda los cambios (puede pedirte confirmación escribiendo `confirm`)

**Importante:** Solo desmarca esta opción si necesitas acceso público. Las otras opciones de "Block public access" pueden permanecer marcadas para mayor seguridad.

### Paso 5: Verificar la Configuración

1. Sube un archivo de prueba desde la aplicación
2. Verifica que la URL generada sea accesible públicamente
3. La URL debería tener el formato: `https://promotores-s3.s3.us-east-1.amazonaws.com/diartec/[uuid].[ext]`

## Alternativa: Habilitar ACLs (No Recomendado)

Si prefieres usar ACLs en lugar de políticas de bucket:

1. Ve a **"Permissions"** > **"Object Ownership"**
2. Selecciona **"ACLs enabled"**
3. Marca **"Bucket owner preferred"** o **"Object writer"**
4. Guarda los cambios

**Nota:** AWS recomienda usar políticas de bucket en lugar de ACLs para mayor seguridad y control.

## Verificación

Después de configurar la política de bucket:

1. Reinicia el servidor de desarrollo
2. Intenta subir un archivo desde la aplicación
3. Verifica que no aparezca el error `AccessControlListNotSupported`
4. Confirma que puedes acceder a la URL del archivo en el navegador

## Seguridad

- La política solo permite acceso de **lectura** (`s3:GetObject`) a archivos en `diartec/`
- No permite escritura, eliminación o modificación desde fuera
- Los archivos siguen siendo privados fuera de la carpeta `diartec/`
- Solo los archivos subidos por la aplicación serán públicos

## Troubleshooting

**Error: "Access Denied" al acceder a la URL**
- Verifica que la política de bucket esté correctamente configurada
- Asegúrate de que el path del archivo comience con `diartec/`
- Verifica que "Block public access" no esté bloqueando el acceso

**Error: "Bucket policy is invalid"**
- Verifica la sintaxis JSON
- Asegúrate de usar el ARN correcto del bucket
- Reemplaza `promotores-s3` con el nombre real de tu bucket
