const express = require("express");
const ProductManager = require("./productManager");
const CartManager = require("./cartManager");

const app = express();

app.use(express.json());

// Instanciar ProductManager y CartManager
const productManager = new ProductManager("./src/products.json");  
const cartManager = new CartManager("./src/carts.json");          

// let cartID = 1;  // Para asignar nuevos IDs de carritos

// --------------------- RUTAS DE PRODUCTOS ---------------------

// GET de todos los productos
app.get("/api/products", async (req, res) => {
    const productos = await productManager.getAllProducts();
    res.json(productos);
});

// GET de producto por ID
app.get("/api/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const producto = await productManager.getProductById(id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// POST para agregar nuevo producto
app.post("/api/products", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const nuevoProducto = await productManager.addProduct({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails: thumbnails || []
    });
    res.status(201).json(nuevoProducto);
});

// PUT para actualizar un producto
app.put("/api/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const datosActualizados = req.body;
    const productoActualizado = await productManager.updateProduct(id, datosActualizados);
    if (productoActualizado) {
        res.json(productoActualizado);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// DELETE para eliminar un producto
app.delete("/api/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const productoEliminado = await productManager.deleteProduct(id);
    if (productoEliminado) {
        res.json({ eliminado: productoEliminado });
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// --------------------- RUTAS DE CARRITOS ---------------------

// POST para crear un nuevo carrito
app.post("/api/carts", async (req, res) => {
    const nuevoCarrito = await cartManager.createCart();
    res.status(201).json(nuevoCarrito);
});

// GET para ver productos de un carrito
app.get("/api/carts/:cid", async (req, res) => {
    const id = parseInt(req.params.cid);
    const carrito = await cartManager.getCartById(id);
    if (carrito) {
        res.json(carrito.products);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
});

// POST para agregar un producto a un carrito
app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cartID = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const carrito = await cartManager.getCartById(cartID);
    if (!carrito) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productoEnCarrito = carrito.products.find(p => p.product === productId);
    if (productoEnCarrito) {
        productoEnCarrito.quantity++;
    } else {
        carrito.products.push({ product: productId, quantity: 1 });
    }

    await cartManager.updateCart(carrito);  
    res.json(carrito);
});



app.listen(8080, () => {
    console.log('Servidor funcionando en el puerto 8080');
});
