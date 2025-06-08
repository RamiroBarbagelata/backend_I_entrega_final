const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");

const {
  createCart,
  getCartById,
  addProductToCart
} = require("../controllers/carts.controller");


router.post("/", createCart);


router.get("/:cid", getCartById);


router.post("/:cid/product/:pid", addProductToCart);

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ status: "error", message: "Cantidad inválida" });
    }

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (productIndex === -1) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.json({ status: "success", message: "Cantidad actualizada", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});



router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);

    await cart.save();

    res.json({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    cart.products = [];
    await cart.save();

    res.json({ status: "success", message: "Todos los productos eliminados del carrito", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


module.exports = router;



