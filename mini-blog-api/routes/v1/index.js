const express = require("express");
const router = express.Router();

const articleRouter = require("./article");
const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");

router.use("/articles", articleRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);

module.exports = router;
