const express = require("express");
const router = express.Router();
const { ImageUpload } = require("../models/imageUpload.js");

router.get("/", async (req, res) => {
  try {
    const imageUploadList = await ImageUpload.find();

    if (!imageUploadList) {
      return res.status(500).json({ success: false });
    }

    return res.status(200).json(imageUploadList);
  } catch (error) {
    console.error("Error fetching image uploads:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false });
    }
  }
});

router.delete("/deleteAllImages", async (req, res) => {
  try {
    const images = await ImageUpload.find();
    let deletedImage = null;

    if (images.length !== 0) {
      for (const image of images) {
        deletedImage = await ImageUpload.findByIdAndDelete(image.id);
        //console.log(image)
      }
    }

    return res.json(deletedImage);
  } catch (error) {
    console.error("Error deleting images:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false });
    }
  }
});

module.exports = router;
