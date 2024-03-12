const express = require("express");
const JWT_SECRET = require("../config");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require(".../db");
const { authMiddleware } = require("../middleware");

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

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});


// updating the data in the exsited data
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

// for getting the data to database
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
