const socket = io();

socket.on("update-products", (products) => {
    const list = document.getElementById("product-list");
    list.innerHTML = "";
    products.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${p.title}</strong> - $${p.price} (ID: ${p._id})`;
        list.appendChild(li);
    });
});

const form = document.getElementById("add-product-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.price = parseFloat(data.price);
    data.stock = parseInt(data.stock);
    socket.emit("new-product", data);
    form.reset();
});


const deleteForm = document.getElementById("delete-product-form");
deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = deleteForm.id.value.trim();
    socket.emit("delete-product", id);
    deleteForm.reset();
});
