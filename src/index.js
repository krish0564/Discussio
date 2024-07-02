const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const port = 3000;

const userRouter = require("./Routes/userRoutes");
const discussionRoutes = require("./Routes/discussionRoutes");
const connectMongoDB = require("./Database/connecMongoDB");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Discusso!");
});

app.use("/api/users", userRouter);
app.use("/api/discussion", discussionRoutes);

app.listen(port, () => {
  console.log(`Discusso server is running at http://localhost:${port}`);
  connectMongoDB();
});
