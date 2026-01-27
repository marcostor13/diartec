# Diartec - Plataforma de Pedidos

Plataforma web para realizar pedidos de personalización de prendas textiles con servicios de sublimado, calandrado y corte láser.

## 🚀 Características

- **Landing Page** moderna y responsive
- **Wizard de Pedidos** con múltiples pasos:
  - Datos de contacto
  - Selección de tallas y cantidades
  - Nombres y números de impresión
  - Diseño y referencias
  - Confirmación
- **Envío de correos electrónicos**:
  - Confirmación al cliente
  - Notificación a Diartec con todos los detalles del pedido

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio o navega al directorio del proyecto:
```bash
cd diartec
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - El archivo `.env` ya está creado con las credenciales SMTP
   - Asegúrate de que el archivo `.env` contenga:
```
USER_EMAIL=mtorres.noon@gmail.com
PASSWORD_EMAIL=uxavdkkmtfizqnxf
DIARTEC_EMAIL=diartecnolasco@gmail.com
```

## 🏃 Ejecución

### Desarrollo

Para ejecutar tanto el frontend como el backend simultáneamente:

```bash
npm run dev:all
```

Esto iniciará:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### Ejecutar por separado

**Solo Frontend:**
```bash
npm run dev
```

**Solo Backend:**
```bash
npm run server
```

## 📧 Configuración de Correos

El sistema envía automáticamente dos correos cuando se completa un pedido:

1. **Correo al Cliente**: Confirmación del pedido con todos los detalles
2. **Correo a Diartec**: Notificación con la información completa del pedido y cliente

Los correos utilizan el diseño de la plataforma y el logo de Diartec.

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - React 19
  - Vite
  - Tailwind CSS 4
  - Lucide React (iconos)

- **Backend:**
  - Node.js
  - Express
  - Nodemailer (SMTP)
  - CORS

## 📁 Estructura del Proyecto

```
diartec/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/
│   └── polo-sublimado.png
├── netlify/
│   └── functions/
│       ├── api.js       # Netlify Function (serverless)
│       └── package.json
├── server.js            # Servidor backend (desarrollo)
├── netlify.toml         # Configuración de Netlify
├── .env                 # Variables de entorno
├── package.json
└── vite.config.js
```

## 🔐 Seguridad

- Las credenciales SMTP están en el archivo `.env` que está en `.gitignore`
- No compartas el archivo `.env` públicamente
- Para producción, usa variables de entorno del servidor

## 📝 Notas

- El servidor backend debe estar corriendo para que funcionen los envíos de correo
- El puerto del backend es configurable mediante la variable `PORT` en `.env` (por defecto 3001)
- El frontend usa un proxy en desarrollo para comunicarse con el backend

## 🌐 Despliegue en Netlify

El proyecto está configurado para desplegarse en Netlify usando Netlify Functions (serverless).

### Pasos para desplegar:

1. **Preparar el repositorio:**
   - Asegúrate de que tu código esté en un repositorio Git (GitHub, GitLab, Bitbucket)

2. **Conectar con Netlify:**
   - Ve a [Netlify](https://www.netlify.com/)
   - Inicia sesión y haz clic en "Add new site" > "Import an existing project"
   - Conecta tu repositorio

3. **Configurar el build:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Netlify detectará automáticamente el archivo `netlify.toml`

4. **Configurar Variables de Entorno:**
   En la configuración del sitio en Netlify, ve a:
   - **Site settings** > **Environment variables**
   - Agrega las siguientes variables:
     ```
     USER_EMAIL=mtorres.noon@gmail.com
     PASSWORD_EMAIL=uxavdkkmtfizqnxf
     DIARTEC_EMAIL=diartecnolasco@gmail.com
     ```

5. **Desplegar:**
   - Netlify desplegará automáticamente cuando hagas push a la rama principal
   - O haz clic en "Deploy site" para un despliegue manual

### Notas sobre el despliegue:

- Las Netlify Functions se ejecutan automáticamente en `/api/*`
- El archivo `netlify.toml` configura los redirects necesarios
- El frontend detecta automáticamente si está en desarrollo o producción
- En producción, las rutas API se resuelven automáticamente a `/.netlify/functions/api`

## 🐛 Solución de Problemas

**Error al enviar correos:**
- Verifica que el servidor backend esté corriendo (en desarrollo)
- Revisa las credenciales SMTP en `.env` (desarrollo) o en Netlify (producción)
- Asegúrate de que la contraseña de aplicación de Gmail sea correcta
- En Netlify, verifica que las variables de entorno estén configuradas correctamente

**CORS errors:**
- Asegúrate de que el backend esté corriendo en el puerto 3001 (desarrollo)
- Verifica la configuración del proxy en `vite.config.js`
- En producción (Netlify), los redirects manejan automáticamente las rutas

**Errores en Netlify Functions:**
- Verifica los logs en el dashboard de Netlify
- Asegúrate de que todas las dependencias estén en `package.json`
- Verifica que las variables de entorno estén configuradas en Netlify
