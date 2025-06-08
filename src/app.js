const express = require("express");
const path = require("path");
const CartManager = require("./cartManager.js");
const productsRoute = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router.js");
const setupSocket = require("./utils/socket.js");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const exphbs = require("express-handlebars");

dotenv.config();
require("./config/db");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", viewsRouter);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRouter);


const cartManager = new CartManager("/data/carts.json");


setupSocket(io);


server.listen(8080, () => {
    console.log("🚀 Servidor escuchando en puerto 8080");
});


