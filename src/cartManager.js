const fs = require("fs").promises;
const path = require("path");

class CartManager {
    constructor() {
        this.filePath = path.join(__dirname, "carts.json");
    }

    // Cargar carrito
    async loadCarts() {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            this.carts = JSON.parse(data);
        } catch (error) {
        
            this.carts = [];
        }
    }

    // Guardar carritos en el archivo
    async saveCarts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("❌ Error al guardar carritos:", error.message);
        }
    }

    // Crear un nuevo carrito
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

    // Obtener un carrito por su ID
    async getCartById(id) {
        await this.loadCarts();
        return this.carts.find(c => c.id === id);
    }

    // Actualizar un carrito completo
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

