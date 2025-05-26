const express = require("express");
const path = require("path");
const ProductManager = require("./productManager.js");
const CartManager = require("./cartManager.js");
const productsRoute = require("../routes/products.router.js");
const cartRouter = require("../routes/carts.router.js");
const viewsRouter = require("../routes/views.router.js");

const exphbs = require("express-handlebars");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);           // Servidor HTTP
const io = new Server(server);                   // Servidor WebSocket

// Configuramos Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRouter);

// Instancias
const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/carts.json");

// WebSocket
io.on("connection", async (socket) => {
    console.log("🟢 Cliente conectado");

    // Al conectar, enviar productos actuales
    const products = await productManager.getAllProducts();
    socket.emit("update-products", products);

    // Crear producto
    socket.on("new-product", async (nuevoProducto) => {
        await productManager.addProduct(nuevoProducto);
        const updatedProducts = await productManager.getAllProducts();
        io.emit("update-products", updatedProducts);
    });

    // Eliminar producto
    socket.on("delete-product", async (id) => {
        await productManager.deleteProduct(parseInt(id));
        const updatedProducts = await productManager.getAllProducts();
        io.emit("update-products", updatedProducts);
    });
});

// Iniciar servidor
server.listen(8080, () => {
    console.log("🚀 Servidor escuchando en puerto 8080");
});

