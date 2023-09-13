const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    picture: {
      img: {
        type: String,
        default: null,
      },
      key: {
        type: String,
        default: null,
      },
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "rider", "provider"],
      default: "user",
    },
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      code: {
        type: Number,
        default: null,
      },
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function (fullName) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
