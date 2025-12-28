const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("../models/Article");
const mockGoogleSearch = require("../services/mockGoogleSearch");
const mockRewrite = require("../services/mockRewrite");

async function autoUpdate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected for Phase 2 (MOCK MODE)");

  const articles = await Article.find({ isUpdated: false });

  for (const article of articles) {
    console.log(`Updating article: ${article.title}`);

    // Mock competitor search
    const competitors = await mockGoogleSearch(article.title);

    // Mock AI rewrite
    const updatedContent = await mockRewrite(article.content);

    article.content = updatedContent;
    article.isUpdated = true;
    await article.save();

    console.log(`Updated: ${article.title}`);
  }

  console.log("Phase 2 MOCK automation completed");
  process.exit();
}

autoUpdate();
