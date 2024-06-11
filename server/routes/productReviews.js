const { ProductReviews } = require("../models/productReviews");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    let reviews = [];

    if (req.query.productId) {
      reviews = await ProductReviews.find({ productId: req.query.productId });
    } else {
      reviews = await ProductReviews.find();
    }

    if (!reviews) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.get(`/get/count`, async (req, res) => {
  try {
    const productsReviews = await ProductReviews.countDocuments();

    if (productsReviews === undefined || productsReviews === null) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).send({ productsReviews });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const review = await ProductReviews.findById(req.params.id);

    if (!review) {
      return res
        .status(500)
        .json({ message: "The review with the given ID was not found." });
    }

    return res.status(200).send(review);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

router.post("/add", async (req, res) => {
  try {
    let review = new ProductReviews({
      customerId: req.body.customerId,
      customerName: req.body.customerName,
      review: req.body.review,
      customerRating: req.body.customerRating,
      productId: req.body.productId,
    });

    if (!review) {
      return res.status(500).json({ success: false });
    }

    review = await review.save();

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
