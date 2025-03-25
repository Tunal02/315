const express = require("express");
const { getOrders, placeOrder } = require("../controllers/Order.controller");
const router = express.Router();

router.post("/add-to-cart", placeOrder);
router.get("/getorder", getOrders);

module.exports = router;
