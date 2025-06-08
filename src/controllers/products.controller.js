const Product = require("../models/product.model");


const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? { $or: [{ category: query }, { status: query === "true" }] }
      : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
    };

    const result = await Product.paginate(filter, options);

    const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } = result;

    res.json({
      status: "success",
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page: result.page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}` : null,
      nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}` : null,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: "success", product: newProduct });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", product: updated });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);
    if (!deleted) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

