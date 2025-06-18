# 🖥️ Frontend React - Sistema de Gestión de Hotel

Este proyecto corresponde al frontend del sistema de gestión hotelera, desarrollado en **React con Vite**, que se conecta a un backend REST en Laravel desplegado en CPanel (`https://api.examplereact.lat`).

## 📦 Tecnologías usadas

- React 18 + Vite
- Bootstrap 5
- SweetAlert2
- Axios
- React Icons

---

## ⚙️ Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/nfacudo123/app_front.git
cd app_front

# 2. Instala las dependencias
npm install
```

## 🧪 Servidor de desarrollo

```bash
npm run dev
```

Este comando abrirá la aplicación en `http://localhost:5173` por defecto.

## 🛠️ Compilar para producción (en CPanel o servidor real)

```bash
npm run build
```

Luego, sube el contenido de la carpeta `dist` a `public_html` o el directorio correspondiente en tu servidor CPanel.

---

## 🔗 Configuración de conexión con backend

El archivo `src/api/axiosInstance.js` debe contener:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.examplereact.lat', //URL DE BACKEND
});

export default api;
```

Esto asegura la comunicación entre frontend y backend sin necesidad de prefijo `/api` en las rutas, ya que corresponde a un subdominio.

---

## 🧩 Componentes principales

- `HotelForm.jsx`: formulario para crear hoteles (modal)
- `RoomAssignmentModal.jsx`: modal de configuración de habitaciones
- `HotelList.jsx`: muestra la lista de hoteles y botón para configurar habitaciones
- `App.jsx`: carga general de la interfaz

---

## 🎯 Validaciones incluidas

- El `NIT` debe cumplir el formato `123456789-0`
- No se permite duplicar nombres de hoteles
- La configuración de habitaciones no debe exceder el límite
- No se permite repetir combinación para el mismo hotel

---

## ✨ Experiencia de usuario

- Diseño responsivo compatible con portátiles de 13 y 15 pulgadas
- Ventanas modales no se cierran accidentalmente
- Alertas elegantes y confirmaciones usando **SweetAlert2**
- Feedback visual en validaciones de campos

---

## 📁 Estructura

```
src/
├── components/
│   ├── HotelForm.jsx
│   ├── HotelList.jsx
│   ├── RoomAssignmentModal.jsx
├── api/axiosInstance.js
├── App.jsx
└── main.jsx
```

---

## 🌐 Despliegue en producción

1. Correr `npm run build`
2. Subir carpeta `dist` a `public_html` (o similar) en tu hosting con CPanel
3. Configurar CORS correctamente en el backend para aceptar peticiones

---

## 👨‍💻 Autor

- Desarrollado por: Nelson Facundo
