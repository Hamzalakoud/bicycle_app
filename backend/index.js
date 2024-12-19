const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bikerouter = require("./routes/bicyclesRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const transactionRoute = require("./routes/transactionRoute");
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
dotenv.config(); // Loads .env file
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", userRoute); // User routes
app.use("/api", bikerouter);
app.use("/booking", bookingRoutes);

//console.log(router.stack.map((r) => r.route.path));

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});