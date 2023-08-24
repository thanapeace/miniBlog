const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const responseBody = require("../../utils/responseBody");
const middlewares = require("../../middlewares");

router.get("/", async function (req, res, next) {
  const page = parseInt(req.query.page);
  const take = 20;
  const skip = (page - 1) * take;
  const categoryId = parseInt(req.query.categoryId);
  try {
    const result = await prisma.article.findMany({
      take: take || undefined,
      skip: skip || undefined,
      orderBy: {
        publishedAt: "desc",
      },
      where: {
        published: true,
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

    const countArticle = await prisma.article.count({
      where: { published: true },
    });

    return res.json({
      result,
      total: countArticle,
      currentPage: page,
      numberOfPages: Math.ceil(countArticle / take),
    });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const result = await prisma.article.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        published: true,
        publishedAt: true,
        user: {
          select: {
            id: true,
            image_url: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Create Article
router.post(
  "/create",
  middlewares.verifyToken,
  async function (req, res, next) {
    try {
      const result = await prisma.article.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
          publishedAt: req.body.published ? new Date() : null,
          user: {
            connect: { id: req.user.id },
          },
          category: {
            connect: { id: req.body.categoryId },
          },
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
      return res.status(201).json(result);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  }
);

// Update Article
router.patch(
  "/:id/update",
  middlewares.verifyToken,
  async function (req, res, next) {
    try {
      const article = await prisma.article.findUnique({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
        select: {
          publishedAt: true,
        },
      });
      const result = await prisma.article.update({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
        data: {
          title: req.body.title || undefined,
          content: req.body.content || undefined,
          published: req.body.published || undefined,
          publishedAt:
            !article.publishedAt && req.body.published ? new Date() : undefined,
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
  }
);

// Delete Article
router.delete(
  "/:id/delete",
  middlewares.verifyToken,
  async function (req, res, next) {
    try {
      const result = await prisma.article.delete({
        where: {
          id: req.params.id,
        },
      });
      return res.json({ message: "Article deleted successfully" });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  }
);

module.exports = router;
