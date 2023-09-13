const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First Name is required."),
  check("lastName").notEmpty().withMessage("Last Name is required."),
  check("email").isEmail().withMessage("Enter a valid email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
  check("phone")
    .isLength({ min: 11 })
    .withMessage("Enter a valid phone number"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Invalid Email Address"),
  check("password").isLength({ min: 1 }).withMessage("Invalid Password"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  next();
};
