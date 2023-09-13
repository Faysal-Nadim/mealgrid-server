const jwt = require("jsonwebtoken");
const multerS3 = require("multer-s3");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const shortid = require("shortid");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "ap-southeast-1",
});

exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "aleeha",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(401).json({ message: "Authorization Required" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin Access Denied" });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "User Access Denied" });
  }
  next();
};
