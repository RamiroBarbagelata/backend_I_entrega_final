const express = require('express');
const router = express.Router();
const ProductManager = require('../src/productManager');


const productManager = new ProductManager("../src/products.json");

// GET de todos los productos
router.get("/", async (req, res) => {
    const products = await productManager.getAllProducts();
    res.json(products);
});


// GET producto por ID
router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const producto = await productManager.getProductById(id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// POST nuevo producto
router.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const nuevoProducto = await productManager.addProduct({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails: thumbnails || []
    });
    res.status(201).json(nuevoProducto);
});

// PUT actualizar producto
router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const datosActualizados = req.body;
    const productoActualizado = await productManager.updateProduct(id, datosActualizados);
    if (productoActualizado) {
        res.json(productoActualizado);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// DELETE eliminar producto
router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const productoEliminado = await productManager.deleteProduct(id);
    if (productoEliminado) {
        res.json({ mensaje: "Producto eliminado correctamente", producto: productoEliminado });
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

module.exports = router;
