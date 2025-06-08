const Product = require("../models/product.model");

class ProductManager {

    async addProduct(productData) {
        try {
            const product = new Product(productData);
            const savedProduct = await product.save();
            return savedProduct;
        } catch (error) {
            console.error("Error al agregar producto:", error.message);
            throw error;
        }
    }

    async getAllProducts(filter = {}, options = {}) {
        // options: { limit, page, sort }
        try {
            const limit = options.limit ? parseInt(options.limit) : 10;
            const page = options.page ? parseInt(options.page) : 1;
            const sort = options.sort === 'asc' ? { price: 1 }
                : options.sort === 'desc' ? { price: -1 }
                    : {};

            const skip = (page - 1) * limit;

            const products = await Product.find(filter)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .lean();

            const totalProducts = await Product.countDocuments(filter);
            const totalPages = Math.ceil(totalProducts / limit);

            return {
                status: "success",
                payload: products,
                totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
                page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevLink: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
                nextLink: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
            };
        } catch (error) {
            console.error("Error al obtener productos:", error.message);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            return await Product.findById(id).lean();
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    }

    async updateProduct(id, updatedData) {
        try {
            return await Product.findByIdAndUpdate(id, updatedData, { new: true });
        } catch (error) {
            console.error("Error al actualizar producto:", error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error al eliminar producto:", error.message);
            throw error;
        }
    }
}

module.exports = ProductManager;





