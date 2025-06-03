const { readJSON, writeJSON } = require("./utils/fileManager");
const path = require("path");

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, "products.json");
    }

    
    async loadProducts() {
        try {
            let data = await readJSON(this.path, "utf-8");
            this.products = JSON.parse(data);
            console.log("Productos cargados:", this.products);
        } catch (error) {
            console.log("No se pudo cargar productos, inicializando lista vacía.");
            this.products = [];
        }
    }


    
    async saveProducts() {
        try {
            await writeJSON(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar productos:", error.message);
        }
    }


    
    async addProduct(product) {
        await this.loadProducts();

        // Filtrar productos con id: null y calcular el nuevo ID
        let newId = this.products.filter(p => p.id !== null).length > 0
            ? Math.max(...this.products.filter(p => p.id !== null).map(p => p.id)) + 1
            : 1;

        
        const newProduct = {
            id: newId,
            ...product
        };

        
        this.products.push(newProduct);
        await this.saveProducts(); 

        return newProduct; 
    }



   
    async getAllProducts() {
        await this.loadProducts();
        return this.products;
    }

    
    async getProductById(id) {
        await this.loadProducts();
        return this.products.find(product => product.id === id);
    }

    
    async updateProduct(id, updatedData) {
        await this.loadProducts();
        const productIndex = this.products.findIndex(p => p.id === id);

        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedData };
            await this.saveProducts();
            return this.products[productIndex];  
        }
        return null; 
    }


    
    async deleteProduct(id) {
        await this.loadProducts();
        const index = this.products.findIndex(p => p.id === id);

        if (index !== -1) {
            const productoEliminado = this.products.splice(index, 1)[0];
            await this.saveProducts();
            return productoEliminado;  
        }
        return null;  
    }

}

module.exports = ProductManager;




