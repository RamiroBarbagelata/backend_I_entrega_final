const express = require("express");
const router = express.Router();
const CartManager = require("../src/cartManager");

const cartManager = new CartManager("../src/carts.json");

// POST nuevo carrito
router.post("/", async (req, res) => {
    const nuevoCarrito = await cartManager.createCart();
    res.status(201).json(nuevoCarrito);
});

// GET productos del carrito
router.get("/:cid", async (req, res) => {
    const id = parseInt(req.params.cid);
    const carrito = await cartManager.getCartById(id);
    if (carrito) {
        res.json(carrito.products);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
});

// POST agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const cartID = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const carrito = await cartManager.getCartById(cartID);
    if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productoEnCarrito = carrito.products.find(p => p.product === productId);
    if (productoEnCarrito) {
        productoEnCarrito.quantity++;
    } else {
        carrito.products.push({ product: productId, quantity: 1 });
    }

    await cartManager.updateCart(carrito);
    res.json(carrito);
});

module.exports = router;
