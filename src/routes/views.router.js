const express = require("express");
const router = express.Router();
const ProductManager = require("../productManager.js");
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    const productos = await productManager.getAllProducts();
    res.render("index", { products: productos });
});

router.get("/realtimeproducts", async (req, res) => {
    const productos = await productManager.getAllProducts();
    res.render("realTimeProducts", { products: productos });
});

module.exports = router;


