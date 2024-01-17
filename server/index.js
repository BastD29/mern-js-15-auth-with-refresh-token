const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const port = process.env.PORT || 6000;

const app = express();

app.use(
  cors({
    origin: "https://auth-t5a0.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
