const Vendor = require("../models/vendor");

exports.createVendor = (req, res) => {
  const {
    vendor_name,
    owner_name,
    phone,
    email,
    country,
    city,
    latitude,
    longitude,
    street_address,
    bank_name,
    account_name,
    account_num,
    branch,
    routing_num,
  } = req.body;

  let cover = {};

  if (req.file) {
    cover = { img: req.file.location, key: req.file.key };
  }

  const _vendor = new Vendor({
    legal_info: {
      vendor_name: vendor_name,
      owner_name: owner_name,
      phone: phone,
      email: email,
    },
    location: {
      country: country,
      city: city,
      latitude: latitude,
      longitude: longitude,
      street_address: street_address,
    },
    payment_info: {
      bank_name: bank_name,
      account_name: account_name,
      account_num: account_num,
      branch: branch,
      routing_num: routing_num,
    },
    cover,
  });

  _vendor.save((error, vendor) => {
    if (error) {
      return res
        .status(400)
        .json({ msg: "Something Went Wrong! Please try again later.", error });
    }
    if (vendor) {
      return res.status(201).json({ msg: "Registration Successful!", vendor });
    } else {
      return res.status(404).json({ msg: "Bad Request!" });
    }
  });
};

exports.getVendor = (req, res) => {
  Vendor.find().exec((error, vendors) => {
    if (error) {
      return res
        .status(400)
        .json({ msg: "Something Went Wrong! Please try again later.", error });
    }
    if (vendors) {
      return res.status(200).json({ msg: "Successful!", vendors });
    } else {
      return res.status(404).json({ msg: "Bad Request!" });
    }
  });
};
