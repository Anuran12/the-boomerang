const { Orders } = require("../models/orders");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    const ordersList = await Orders.find(req.query);

    if (!ordersList) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json(ordersList);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      return res
        .status(500)
        .json({ message: "The order with the given ID was not found." });
    }

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.get(`/get/count`, async (req, res) => {
  try {
    const orderCount = await Orders.countDocuments();

    return res.send({
      orderCount: orderCount,
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.post("/create", async (req, res) => {
  try {
    let order = new Orders({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      pincode: req.body.pincode,
      amount: req.body.amount,
      paymentId: req.body.paymentId,
      email: req.body.email,
      userid: req.body.userid,
      products: req.body.products,
    });

    if (!order) {
      return res.status(500).json({
        success: false,
      });
    }

    order = await order.save();

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Orders.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found!",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order Deleted!",
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const order = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        pincode: req.body.pincode,
        amount: req.body.amount,
        paymentId: req.body.paymentId,
        email: req.body.email,
        userid: req.body.userid,
        products: req.body.products,
        status: req.body.status,
      },
      { new: true }
    );

    if (!order) {
      return res.status(500).json({
        message: "Order cannot be updated!",
        success: false,
      });
    }

    return res.send(order);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
