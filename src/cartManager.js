const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async readFile() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    async createCart() {
        const carts = await this.readFile();
        const newCart = { id: carts.length + 1, products: [] };
        carts.push(newCart);
        await this.writeFile(carts);
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.readFile();
        return carts.find(c => c.id === id);
    }

    async updateCart(cart) {
        const carts = await this.readFile();
        const index = carts.findIndex(c => c.id === cart.id);
        if (index !== -1) {
            carts[index] = cart;
            await this.writeFile(carts);
        }
    }
}

module.exports = CartManager;
