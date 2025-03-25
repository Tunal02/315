const mongoose = require("mongoose");
const Product = require("./models/product");
const dotenv = require("dotenv");

dotenv.config();

const products = [
  { name: "Product 1", price: 10.99, stock: 50, category: "Electronics" },
  { name: "Product 2", price: 20.99, stock: 0, category: "Clothing" },
  { name: "Product 3", price: 15.99, stock: 30, category: "Home" },
];

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    return Product.insertMany(products);
  })
  .then(() => {
    console.log("Database seeded successfully");
    process.exit();
  })
  .catch((error) => {
    console.error("Failed to seed database", error);
    process.exit(1);
  });