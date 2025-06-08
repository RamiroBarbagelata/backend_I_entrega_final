// const ProductManager = require("../managers/ProductManager.js");
// const productManager = new ProductManager("data/products.json"); 

const Product = require("../models/product.model");

module.exports = (io) => {
    io.on("connection", async (socket) => {
        console.log("🟢 Cliente conectado a WebSocket");

        const products = await Product.find().lean();
        socket.emit("update-products", products);

        socket.on("new-product", async (producto) => {
            await Product.create(producto);
            const updated = await Product.find().lean();
            io.emit("update-products", updated);
        });

        socket.on("delete-product", async (id) => {
            await Product.findByIdAndDelete(id);
            const updated = await Product.find().lean();
            io.emit("update-products", updated);
        });
    });
};
