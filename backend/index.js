require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/user");
const { adminRoute } = require("./routes/admin");

const app = express();
app.use(express.json());
app.use(cors());

const saltRound = process.env.SALT_ROUND;
const JWT_SECRECT = process.env.JWT_SECRECT;
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({msg : "Hello World!"});
});

app.use("/user", userRouter);
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`Server started in port - ${port}`);
});
