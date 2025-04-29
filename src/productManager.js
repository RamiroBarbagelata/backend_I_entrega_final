const fs = require('fs');
const path = './src/products.json'; // Ubicación de tu archivo JSON

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts(); // Cargar productos al iniciar la clase
    }

    // Cargar productos desde el archivo JSON
    loadProducts() {
        if (fs.existsSync(path)) {
            const data = fs.readFileSync(path, 'utf-8');
            this.products = JSON.parse(data);
            console.log("Productos cargados desde archivo:", this.products); // Verificar los productos cargados
        } else {
            // Si el archivo no existe, lo creamos vacío
            this.products = [];
            this.saveProducts(); // Guardar productos vacíos si no existen
        }
    }

    // Guardar productos en el archivo JSON
    saveProducts() {
        fs.writeFileSync(path, JSON.stringify(this.products, null, 2), 'utf-8');
        console.log("Productos guardados en archivo:", this.products); // Verificar que los productos se guardaron
    }

    // Agregar un producto
  // Agregar un producto
async addProduct(product) {
    await this.loadProducts(); // Cargamos los productos existentes

    let newId = 1; // Valor inicial por defecto

    if (this.products.length > 0) {
        // Obtenemos todos los IDs existentes
        const ids = this.products.map(p => p.id);

        // Calculamos el próximo ID único
        newId = Math.max(...ids) + 1;
    }

    const newProduct = {
        id: newId,  // Asignamos el ID calculado
        ...product  // El resto de los datos del producto
    };

    this.products.push(newProduct);
    await this.saveProducts(); // Guardamos el nuevo producto

    return newProduct; // Retornamos el producto creado
}


    // Obtener todos los productos
    getAllProducts() {
        this.loadProducts(); // Aseguramos que los productos estén cargados
        return this.products;
    }

    // Obtener producto por ID
    getProductById(id) {
        this.loadProducts();
        return this.products.find(product => product.id === id);
    }

    // Actualizar un producto
    updateProduct(id, updatedData) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedData };
            this.saveProducts();
        }
    }

    // Eliminar un producto
    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1);
            this.saveProducts();
            return deletedProduct;
        }
        return null;
    }
}

module.exports = ProductManager;



