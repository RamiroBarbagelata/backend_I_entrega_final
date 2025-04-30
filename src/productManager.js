const fs = require("fs").promises;
const path = require("path");

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, "products.json");
    }

    // Método para cargar los productos desde el archivo JSON
    async loadProducts() {
        try {
            let data = await fs.readFile(this.path, "utf-8");
            this.products = JSON.parse(data);
            console.log("Productos cargados:", this.products);
        } catch (error) {
            console.log("No se pudo cargar productos, inicializando lista vacía.");
            this.products = [];
        }
    }


    // Método para guardar los productos en el archivo JSON
    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al guardar productos:", error.message);
        }
    }


    // Método para agregar un nuevo producto
    async addProduct(product) {
        await this.loadProducts();

        // Filtrar productos con id: null y calcular el nuevo ID
        let newId = this.products.filter(p => p.id !== null).length > 0
            ? Math.max(...this.products.filter(p => p.id !== null).map(p => p.id)) + 1
            : 1;

        // Creamos el nuevo producto con el ID generado
        const newProduct = {
            id: newId,
            ...product
        };

        // Añadimos el nuevo producto a la lista de productos
        this.products.push(newProduct);
        await this.saveProducts(); // Guardamos los productos con el nuevo producto agregado

        return newProduct; // Retornamos el producto creado
    }



    // Método para obtener todos los productos
    async getAllProducts() {
        await this.loadProducts(); 
        return this.products;
    }

    // Método para obtener un producto por ID
    async getProductById(id) {
        await this.loadProducts(); 
        return this.products.find(product => product.id === id);
    }

    // Método para actualizar un producto
    async updateProduct(id, updatedData) {
        await this.loadProducts(); 
        const productIndex = this.products.findIndex(p => p.id === id);

        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedData };
            await this.saveProducts(); 
        }
    }

    // Método para eliminar un producto
    async deleteProduct(id) {
        await this.loadProducts(); 
        const index = this.products.findIndex(p => p.id === id);

        if (index !== -1) {
            this.products.splice(index, 1);
            await this.saveProducts(); 
        }
    }
}

module.exports = ProductManager;




