const Order = require("../models/order");

exports.placeOrder = (req, res) => {
  const { vendor, invoice, meals, address } = req.body;
  const _order = new Order({
    user: req.user._id,
    orderDate: new Date().toDateString(),
    orderID: `#${Math.floor(Math.random() * 1000000 + 1)}`,
    vendor,
    invoice,
    meals,
    address,
  });
  _order.save((error, order) => {
    if (error) {
      return res
        .status(400)
        .json({ msg: "Couldn't Process Your Request, Please Try Again!" });
    }
    if (order) {
      return res
        .status(201)
        .json({ msg: "Your Order Has Been Placed!", order });
    }
  });
};

exports.getOrdersByUser = async (req, res) => {
  await Order.find({ user: req.user._id }).exec((error, orders) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!" });
    }
    if (orders) {
      return res.status(200).json({ msg: "Sucess!", orders });
    }
  });
};
