const express = require("express");
const ProductManager = require("./productManager");
const CartManager = require("./cartManager");
const productsRoute = require("../routes/products.router.js");
const cartRouter = require("../routes/carts.router");

const app = express();

app.use(express.json());
app.use(express.json()); //para trabajar con JSON
app.use(express.urlencoded({ extended:true})); //para trabajar con FORMULARIOS

// Instanciar ProductManager y CartManager
const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/carts.json");

// let cartID = 1;  // Para asignar nuevos IDs de carritos

// --------------------- RUTAS DE PRODUCTOS ---------------------

// Usamos routers

app.get("/api/products", productsRoute);
app.use("/api/carts", cartRouter);


app.listen(8080, () => {
    console.log('Servidor funcionando en el puerto 8080');
});
