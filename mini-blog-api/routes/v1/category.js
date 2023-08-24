const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const responseBody = require("../../utils/responseBody");

router.get("/popular", async function (req, res, next) {
  try {
    const result = await prisma.category.findMany({
      take: 10,
      include: {
        _count: { select: { article: true } },
      },
      orderBy: {
        article: {
          _count: "desc",
        },
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.get("/", async function (req, res, next) {
  try {
    const result = await prisma.category.findMany();
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

module.exports = router;
