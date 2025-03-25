
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const productRoutes = require("./routes/products.event.js");

const orderRoutes = require("./routes/order.event.js");



dotenv.config();

const app = express();

app.use(express.json());



app.use(
  cors({
      credentials: true,
      origin: "http://localhost:3000"})
);


app.use("/products", productRoutes);
app.use("/orders", orderRoutes);



mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));