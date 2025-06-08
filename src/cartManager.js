const { readJSON, writeJSON } = require("./utils/fileManager");
const path = require("path");

class CartManager {
    constructor() {
        this.filePath = path.join(__dirname, "carts.json");
    }


    async loadCarts() {
        try {
            const data = await readJSON(this.filePath, "utf-8");
            this.carts = JSON.parse(data);
        } catch (error) {

            this.carts = [];
        }
    }


    async saveCarts() {
        try {
            await writeJSON(this.filePath, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("❌ Error al guardar carritos:", error.message);
        }
    }


    async createCart() {
        await this.loadCarts();

        const newId = this.carts.length > 0 ? Math.max(...this.carts.map(c => c.id)) + 1 : 1;

        const newCart = {
            id: newId,
            products: []
        };

        this.carts.push(newCart);
        await this.saveCarts();

        return newCart;
    }


    async getCartById(id) {
        await this.loadCarts();
        return this.carts.find(c => c.id === id);
    }


    async updateCart(cart) {
        await this.loadCarts();
        const index = this.carts.findIndex(c => c.id === cart.id);
        if (index !== -1) {
            this.carts[index] = cart;
            await this.saveCarts();
        }
    }
}

module.exports = CartManager;

