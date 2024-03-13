const express = require("express");
const userRouter = require("./user");
const accountuser = require("./account");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountuser);

module.exports = router;
