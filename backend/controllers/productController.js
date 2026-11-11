const { Product } = require("../models");

exports.getProducts = async (req, res, next) => {
  try {
    res.json(await Product.find().sort({ _id: 1 }));
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, image, description } = req.body;
    await Product.create({ name, price, image, description });
    res.json({ message: "Product Added" });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product Deleted" });
  } catch (error) {
    next(error);
  }
};
