# 🛒 Proyecto Backend | Entrega Final - Coderhouse

Este repositorio contiene la entrega final del curso de **Backend I - Coderhouse**, desarrollado por Ramiro Barbagelata.  
Incluye la implementación completa de un sistema de productos y carritos de compra utilizando **Express**, **MongoDB Atlas**, **Mongoose**, **Handlebars** y **WebSocket** para actualizaciones en tiempo real.

---

## 🚀 Funcionalidades principales

### 📦 Productos
- CRUD completo de productos persistidos en MongoDB
- Filtros por categoría o disponibilidad
- Ordenamiento por precio (asc/desc)
- Paginación con query params (`limit`, `page`, `sort`, `query`)

### 🛒 Carritos
- Crear carritos
- Agregar productos
- Actualizar cantidades
- Eliminar productos individuales
- Vaciar completamente el carrito
- Relación con productos usando `populate()`

### 👀 Vistas con Handlebars
- `index.handlebars`: Lista de productos con paginación
- `realTimeProducts.handlebars`: Lista en vivo con Socket.io y formulario
- `cart.handlebars`: Visualización de productos del carrito

### 🔁 WebSockets (Socket.IO)
- Agregar/eliminar productos en tiempo real desde la vista `/realtimeproducts`
- Sin necesidad de recargar

---

## 🛠 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Handlebars
- Socket.IO
- dotenv
- nodemon
- mongoose-paginate-v2

---

## ▶️ Cómo ejecutar el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/RamiroBarbagelata/Backend-1-entrega-2.git
cd Backend-1-entrega-2

# Instalar dependencias
npm install

# Configurar variables de entorno
touch .env
# Agregar tu conexión a Mongo:
MONGO_URL=mongodb+srv://ramirobarbagelata:54321@entregafinal.rslzsfv.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=entregaFinal

# Iniciar servidor
npm start
```

Abrir en navegador:  
➡️ `http://localhost:8080/products`  
➡️ `http://localhost:8080/realtimeproducts`

---

## 📂 Estructura del proyecto

```
src/
│
├── config/           # Conexión a MongoDB
├── controllers/      # Lógica de negocio
├── models/           # Schemas de Mongoose
├── routes/           # Rutas organizadas
├── utils/            # Socket y helpers
├── views/            # Plantillas Handlebars
└── app.js            # Archivo principal
```

---

## ✅ Estado de entrega

✔ CRUD de productos con MongoDB  
✔ CRUD de carritos con referencias  
✔ Populate para carritos  
✔ WebSockets activos  
✔ Vistas con filtros y botones funcionales  
✔ Proyecto modularizado y limpio

---

## ✨ Autor

**Ramiro Barbagelata**  
San Martín de los Andes, Argentina  

