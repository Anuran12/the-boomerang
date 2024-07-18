const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// Configure CORS to allow any origin
const corsOptions = {
  origin: "*", // Allow any origin
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Logging middleware to check requests
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/categories");
const subCatRoutes = require("./routes/subCat.js");
const productRoutes = require("./routes/products");
const imageUploadRoutes = require("./helper/imageUpload.js");
const productWeightRoutes = require("./routes/productWeight.js");
const productRAMSRoutes = require("./routes/productRAMS.js");
const productSIZESRoutes = require("./routes/productSize.js");
const productReviews = require("./routes/productReviews.js");
const cartSchema = require("./routes/cart.js");
const myListSchema = require("./routes/myList.js");
const ordersSchema = require("./routes/orders.js");
const homeBannerSchema = require("./routes/homeBanner.js");
const searchRoutes = require("./routes/search.js");

app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use(`/api/category`, categoryRoutes);
app.use(`/api/subCat`, subCatRoutes);
app.use(`/api/products`, productRoutes);
app.use(`/api/imageUpload`, imageUploadRoutes);
app.use(`/api/productWeight`, productWeightRoutes);
app.use(`/api/productRAMS`, productRAMSRoutes);
app.use(`/api/productSIZE`, productSIZESRoutes);
app.use(`/api/productReviews`, productReviews);
app.use(`/api/cart`, cartSchema);
app.use(`/api/my-list`, myListSchema);
app.use(`/api/orders`, ordersSchema);
app.use(`/api/homeBanner`, homeBannerSchema);
app.use(`/api/search`, searchRoutes);

// Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection is ready...");
    // Server
    app.listen(process.env.PORT, () => {
      console.log(`server is running http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Default route for testing
app.get("/", (req, res) => {
  res.send("CORS Test Endpoint");
});
