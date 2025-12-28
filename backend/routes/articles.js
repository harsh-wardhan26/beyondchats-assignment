const express = require("express");
const Article = require("../models/Article");

const router = express.Router();

/* CREATE article */
router.post("/", async (req, res) => {
  try {
    const article = new Article(req.body);
    const saved = await article.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* READ all articles */
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
});

/* READ single article */
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
});

/* UPDATE article */
router.put("/:id", async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE article */
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Article deleted" });
});

module.exports = router;
