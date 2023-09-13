const express = require("express");
const {
  signup,
  signin,
  sendVerificationCode,
  verifyEmail,
  signout,
} = require("../controllers/user");
const { requireSignIn, userMiddleware } = require("../middleware");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/user");
const router = express.Router();

router.post(
  "/auth/user/signup",
  validateSignupRequest,
  isRequestValidated,
  signup
);
router.post(
  "/auth/user/signin",
  validateSigninRequest,
  isRequestValidated,
  signin
);
router.post("/auth/user/signout", requireSignIn, userMiddleware, signout);
router.post("/auth/user/verification/email", sendVerificationCode);
router.post("/auth/user/verification/email/verify", verifyEmail);

module.exports = router;
