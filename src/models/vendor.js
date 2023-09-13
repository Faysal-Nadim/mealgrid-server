const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    legal_info: {
      vendor_name: {
        type: String,
        required: true,
      },
      owner_name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
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
    cover: {
      img: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    },
    menu: [
      {
        week_day: {
          type: String,
          trim: true,
        },
        lunch: {
          items: {
            type: String,
          },
          price: {
            type: Number,
          },
        },
        dinner: {
          items: {
            type: String,
          },
          price: {
            type: Number,
          },
        },
        isAvailable: {
          type: Boolean,
        },
      },
    ],
    delivery: {
      fee: {
        type: Number,
        default: 0,
      },
      isExpress: {
        type: Boolean,
        default: false,
      },
    },
    account_manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["Inactive", "Active"],
      default: "Inactive",
    },
    payment_info: {
      bank_name: {
        type: String,
        required: true,
      },
      account_name: {
        type: String,
        required: true,
      },
      account_num: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      routing_num: {
        type: Number,
        required: true,
      },
    },
    reviews: [
      {
        name: {
          type: String,
        },
        date: {
          type: String,
        },
        feedback: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
