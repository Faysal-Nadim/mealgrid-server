const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

//Initializing Server
const app = express();

//Initializing Environment Variable
env.config();

//Route Configuration
const userRoute = require("./routes/user");
const vendorRoute = require("./routes/vendor");
const orderRoute = require("./routes/order");

//Initializing Database Connection
mongoose
  .connect(
    `mongodb+srv://mealgrid22:${process.env.DB_PASS}@mealgrid.rdpaaom.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Server Configuration
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/api/v1", userRoute);
app.use("/api/v1", vendorRoute);
app.use("/api/v1", orderRoute);

//PORT Configuration
app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT 5000`);
});
