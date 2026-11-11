const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDatabase = require("./db");
const { Admin, Contact, Order, Product, Return } = require("./models");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/chat", chatRoutes);

app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Product.find().sort({ _id: 1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

app.post("/api/products", async (req, res, next) => {
  try {
    const { name, price, image, description } = req.body;
    await Product.create({ name, price, image, description });
    res.json({ message: "Product Added" });
  } catch (error) {
    next(error);
  }
});

app.put("/api/products/:id", async (req, res, next) => {
  try {
    const { name, price, image, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.send("Product Updated");
  } catch (error) {
    next(error);
  }
});

app.delete("/api/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.send("Product Deleted");
  } catch (error) {
    next(error);
  }
});

app.get("/api/orders", async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ date: -1, _id: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

app.post("/api/orders", async (req, res, next) => {
  try {
    const { customer_name, phone, address, total } = req.body;
    await Order.create({ customer_name, phone, address, total });
    res.send("Order Added");
  } catch (error) {
    next(error);
  }
});

app.put("/api/orders/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (typeof status === "string" && ["cancelled", "returned"].includes(status.toLowerCase())) {
      const reclamation = `Return requested for order #${order.id}. Details: ${order.address}. Total: ${order.total} TND.`;
      await Return.create({
        client: order.customer_name,
        phone: order.phone,
        reclamation,
        status: "Pending"
      });
      return res.send("Order Updated and Return Created");
    }

    res.send("Order Updated");
  } catch (error) {
    next(error);
  }
});

app.delete("/api/orders/:id", async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.send("Order Deleted");
  } catch (error) {
    next(error);
  }
});

app.get("/api/returns", async (req, res, next) => {
  try {
    const returns = await Return.find().sort({ created_at: -1, _id: -1 });
    res.json(returns);
  } catch (error) {
    next(error);
  }
});

app.post("/api/returns", async (req, res, next) => {
  try {
    const { client, phone, reclamation } = req.body;
    await Return.create({ client, phone, reclamation });
    res.send("Return Added");
  } catch (error) {
    next(error);
  }
});

app.put("/api/returns/:id", async (req, res, next) => {
  try {
    const result = await Return.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { runValidators: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Return not found" });
    }
    res.send("Return Updated");
  } catch (error) {
    next(error);
  }
});

app.delete("/api/returns/:id", async (req, res, next) => {
  try {
    const result = await Return.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Return not found" });
    }
    res.send("Return Deleted");
  } catch (error) {
    next(error);
  }
});

app.get("/api/contacts", async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ created_at: -1, _id: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

app.post("/api/contacts", async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    await Contact.create({ name, email, subject, message });
    res.send("Contact message received");
  } catch (error) {
    next(error);
  }
});

app.delete("/api/contacts/:id", async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.send("Contact message deleted");
  } catch (error) {
    next(error);
  }
});

app.post("/admin/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    res.json({ success: Boolean(admin) });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error("API error:", error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({ error: "The request could not be completed." });
});

async function startServer() {
  await connectDatabase();
  const port = process.env.PORT || 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Server startup failed:", error);
    process.exitCode = 1;
  });
}

module.exports = app;
