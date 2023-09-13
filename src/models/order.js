const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    orderID: {
      type: String,
      required: true,
    },
    invoice: {
      orderTotal: {
        type: Number,
        required: true,
      },
      mealTotal: {
        type: Number,
        required: true,
      },
      mealQty: {
        type: Number,
        required: true,
      },
      deliveryTotal: {
        type: Number,
        required: true,
      },
      paid: {
        type: Number,
        required: true,
      },
      couponCode: {
        type: String,
        default: null,
      },
      couponAmount: {
        type: Number,
        default: 0,
      },
      vat: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ["cod", "bkash", "ssl"],
        default: null,
      },
      status: {
        type: String,
        enum: ["Paid", "Unpaid"],
        default: "Unpaid",
      },
      trxID: {
        type: String,
        default: null,
      },
    },
    meals: [
      {
        date: {
          type: String,
          required: true,
        },
        lunch: {
          items: {
            type: String,
            default: null,
          },
          isOrdered: {
            type: String,
            default: false,
          },
          price: {
            type: Number,
            required: true,
          },
          status: {
            type: String,
            enum: ["Pending", "Picked", "Delivered", "Refunded", "Cancelled"],
            default: "Pending",
          },
        },
        dinner: {
          items: {
            type: String,
            default: null,
          },
          isOrdered: {
            type: String,
            default: false,
          },
          price: {
            type: Number,
            required: true,
          },
          status: {
            type: String,
            enum: ["Pending", "Picked", "Delivered", "Refunded"],
            default: "Pending",
          },
        },
      },
    ],
    address: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      street_address: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
