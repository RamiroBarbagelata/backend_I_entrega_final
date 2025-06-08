const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // 👈 Se relaciona con el modelo Product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);



