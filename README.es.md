# 🇬🇧 To read this in English, visit [README.md](./README.md)
# RAID-App (Español)

RAID-App es una aplicación para la gestión de riesgos, acciones, problemas y dependencias en proyectos.

## Características
- Autenticación de usuarios (registro e inicio de sesión)
- Panel de control para visualizar y gestionar riesgos, dependencias, problemas y suposiciones
- Backend con Node.js, Express y MongoDB
- Frontend con React y Vite

## Instalación

### Requisitos
- Node.js >= 18
- MongoDB Atlas o local

### Clonar el repositorio
```bash
git clone https://github.com/imandresmorales/RAID-App.git
cd RAID-App
```

### Configuración del backend
1. Ve a la carpeta `server`:
   ```bash
   cd server
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con:
   ```env
   MONGODB_URI=tu_uri_de_mongodb
   PORT=3000
   SECRET=tu_secreto_jwt
   ```
4. Inicia el servidor:
   ```bash
   node index.js
   ```

### Configuración del frontend
1. Ve a la carpeta `client`:
   ```bash
   cd ../client
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la app:
   ```bash
   npm run dev
   ```

## Uso
- Accede a `http://localhost:5173` para el frontend.
- El backend estará en `http://localhost:3000`.

## Estructura del proyecto
```
RAID-App/
├── client/        # Frontend React
├── server/        # Backend Node.js/Express
```

## Contribuir
1. Haz un fork del repositorio
2. Crea una rama para tu feature
3. Haz un pull request

## Licencia
MIT
