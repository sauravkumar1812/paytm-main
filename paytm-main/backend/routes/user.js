const express = require("express");
const JWT_SECRET = require("../config");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require(".../db");

// zod schema for the incoming body
const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
// signup end point
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Email already taken / Inccorect Inputs",
    });
  }

  const user = User.findOnde({
    username: body.username,
  });
  if (user._id) {
    return res.json({
      message: "Email already taken / Inccorect Inputs",
    });
  }
  const dbuser = await User.Create(body);
  const token = jwt.sign(
    {
      userId: dbuser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User Created successfully",
    token: token,
  });
});
module.exports = router;
