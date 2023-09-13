const express = require("express");
const { placeOrder, getOrdersByUser } = require("../controllers/order");
const { requireSignIn, userMiddleware } = require("../middleware");
const router = express.Router();

router.post("/user/order/place", requireSignIn, userMiddleware, placeOrder);
router.get("/user/order/get", requireSignIn, userMiddleware, getOrdersByUser);

module.exports = router;
