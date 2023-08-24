const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../../utils/constants");
const saltRounds = constants.SALT_ROUNDS;
const jwtSecret = constants.JWT_SECRET;

const defaultAvatars = () => {
  const randomIndex = Math.floor(
    Math.random() * constants.DEFAULT_AVATARS.length
  );
  const randomAvatar = constants.DEFAULT_AVATARS[randomIndex];
  return randomAvatar;
};

// Register Account
router.post("/register", async (req, res, next) => {
  const avatar = defaultAvatars();
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, saltRounds);
  try {
    const result = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        hashedPassword: hash,
        image_url: avatar,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image_url: true,
      },
    });
    const token = jwt.sign(
      { id: result.id, email: result.email },
      jwtSecret,
      {
        algorithm: "HS256",
      }
    );
    const user = {
      id: result.id,
      name: result.name,
      image_url: result.image_url,
      email: result.email,
      token: token
    };
    res.status(201).json({
      status: "ok",
      message: "Register success",
      user
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An account with this email address already exists" });
  }
});

// Login
router.post("/login", async (req, res, next) => {
  const password = req.body.password;
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image_url: true,
        hashedPassword: true,
      },
    });
    if (!result) res.status(500).json({ message: "No user found" });
    else {
      const comepare = bcrypt.compareSync(password, result.hashedPassword);
      if (comepare) {
        const token = jwt.sign(
          { id: result.id, email: result.email },
          jwtSecret,
          {
            algorithm: "HS256",
          }
        );
        const user = {
          id: result.id,
          name: result.name,
          email: result.email,
          image_url: result.image_url,
          token: token,
        };
        res.json({
          status: "ok",
          message: "Login success",
          user,
        });
      } else
        res
          .status(404)
          .json({ status: "error", message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
