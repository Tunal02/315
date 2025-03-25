const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  productName: {
    type: String,
    required: true
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  deliveryDate: { 
    type: Date, 
    required: true 
  },
}, { timestamps: true });

// Export the model properly
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;