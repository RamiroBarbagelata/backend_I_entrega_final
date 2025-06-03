const ProductManager = require("../managers/ProductManager.js");
const productManager = new ProductManager("data/products.json"); 

module.exports = (io) => {
    io.on("connection", async (socket) => {
        console.log("🟢 Cliente conectado");

        const products = await productManager.getAllProducts();
        socket.emit("update-products", products);

        socket.on("new-product", async (nuevoProducto) => {
            await productManager.addProduct(nuevoProducto);
            const updated = await productManager.getAllProducts();
            io.emit("update-products", updated);
        });

        socket.on("delete-product", async (id) => {
            await productManager.deleteProduct(parseInt(id));
            const updated = await productManager.getAllProducts();
            io.emit("update-products", updated);
        });
    });
};
