const mongoose = require('mongoose');
require("dotenv").config();

const MONGO_URI = "mongodb+srv://ramirobarbagelata:54321@entregafinal.rslzsfv.mongodb.net/?retryWrites=true&w=majority&appName=entregaFinal";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });
