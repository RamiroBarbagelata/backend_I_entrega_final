const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;

    const filter = query
      ? { $or: [{ category: query }, { status: query === "true" }] }
      : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
      lean: true 
    };

    const result = await Product.paginate(filter, options);

    res.render("index", {
      products: result.docs,
      pagination: {
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
      }
    });
  } catch (error) {
    res.status(500).send("Error al cargar productos");
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.product").lean();

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cart", { cart });
  } catch (error) {
    res.status(500).send("Error al cargar el carrito");
  }
});

router.get("/realtimeproducts", async (req, res) => {
    const productos = await Product.find().lean();
    res.render("realTimeProducts", { products: productos });
});

module.exports = router;



