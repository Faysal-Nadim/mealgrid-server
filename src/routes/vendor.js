const express = require("express");
const { createVendor, getVendor } = require("../controllers/vendor");
const { uploadS3, requireSignIn, userMiddleware } = require("../middleware");
const router = express.Router();

router.post("/vendor/create", uploadS3.single("cover"), createVendor);
router.get("/vendor/get", requireSignIn, userMiddleware, getVendor);

module.exports = router;
