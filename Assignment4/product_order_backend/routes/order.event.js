const express = require("express");
const router = express.Router();
const {
  purchaseProduct,
  getUserPurchases,
} = require("../controllers/OrderController");

router.post("/", purchaseProduct);
router.get("/order/:orderId", getUserPurchases);

module.exports = router;