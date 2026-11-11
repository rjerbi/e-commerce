const mongoose = require("mongoose");

const schemaOptions = {
  strict: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
};

function createSchema(fields) {
  return new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString()
      },
      ...fields
    },
    schemaOptions
  );
}

module.exports = {
  Product: mongoose.model(
    "Product",
    createSchema({
      name: String,
      price: Number,
      image: String,
      description: String,
      created_at: { type: Date, default: Date.now }
    }),
    "products"
  ),
  Order: mongoose.model(
    "Order",
    createSchema({
      customer_name: String,
      phone: String,
      address: String,
      total: Number,
      status: { type: String, default: "Pending" },
      date: { type: Date, default: Date.now }
    }),
    "orders"
  ),
  Return: mongoose.model(
    "Return",
    createSchema({
      client: String,
      phone: String,
      reclamation: String,
      status: { type: String, default: "Pending" },
      created_at: { type: Date, default: Date.now }
    }),
    "returns"
  ),
  Contact: mongoose.model(
    "Contact",
    createSchema({
      name: String,
      email: String,
      subject: String,
      message: String,
      created_at: { type: Date, default: Date.now }
    }),
    "contacts"
  ),
  Admin: mongoose.model(
    "Admin",
    createSchema({
      email: String,
      password: String,
      created_at: { type: Date, default: Date.now }
    }),
    "admin"
  )
};
