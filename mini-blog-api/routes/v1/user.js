const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const middlewares = require("../../middlewares");
const responseBody = require("../../utils/responseBody");

router.get("/", async function (req, res, next) {
  try {
    const result = await prisma.user.findMany();
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image_url: true,
        bio: true,
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.get("/:cuid/articles", async function (req, res, next) {
  const take = parseInt(req.query.take);
  const skip = parseInt(req.query.skip);
  const categoryId = parseInt(req.query.categoryId);
  const id = req.params.cuid;
  try {
    const result = await prisma.article.findMany({
      take: take || undefined,
      skip: skip || undefined,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: id,
        categoryId: categoryId || undefined,
      },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        categoryId: true,
        published: true,
        publishedAt: true,
        user: {
          select: {
            id: true,
            image_url: true,
            name: true,
          },
        },
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Update Account
router.patch(
  "/update",
  middlewares.verifyToken,
  async function (req, res, next) {
    try {
      const result = await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          name: req.body.name || undefined,
          image_url: req.body.image_url || undefined,
          bio: req.body.bio || undefined,
        },
        select: {
          id: true,
          name: true,
          image_url: true,
          bio: true,
        },
      });
      return res.json(result);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  }
);

// Delete Account
router.delete(
  "/delete",
  middlewares.verifyToken,
  async function (req, res, next) {
    try {
      const result = await prisma.user.delete({
        where: {
          id: req.body.id,
        },
        select: {
          id: true,
          name: true,
        },
      });
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(404).json({ message: error});
    }
  }
);

module.exports = router;
