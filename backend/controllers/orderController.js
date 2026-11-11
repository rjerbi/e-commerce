const { Order } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const { customer_name, phone, address, total } = req.body;
    await Order.create({ customer_name, phone, address, total });
    res.json({ message: "Order Created" });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    res.json(await Order.find().sort({ date: -1, _id: -1 }));
  } catch (error) {
    next(error);
  }
};
