const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("../models/Article");

async function scrapeOldBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected for scraping");

    const blogsUrl = "https://beyondchats.com/blogs/";
    const { data } = await axios.get(blogsUrl);
    const $ = cheerio.load(data);

    let lastPageUrl = $(".page-numbers").last().attr("href");
    if (!lastPageUrl) lastPageUrl = blogsUrl;

    const lastPage = await axios.get(lastPageUrl);
    const $$ = cheerio.load(lastPage.data);

    const articleLinks = [];
    $$(".entry-title a").each((i, el) => {
      if (articleLinks.length < 5) {
        articleLinks.push($$(el).attr("href"));
      }
    });

    console.log("Found article links:", articleLinks);

    for (const link of articleLinks) {
      const articlePage = await axios.get(link);
      const $$$ = cheerio.load(articlePage.data);

      const title = $$$("h1").text().trim();

      let content = "";
      if ($$$(".entry-content").length > 0) {
        content = $$$(".entry-content").text().trim();
      } else {
        content = $$$("article").text().trim();
      }

      if (!content || content.length < 100) {
        console.log(`Skipped (no content): ${title}`);
        continue;
      }

      const article = new Article({
        title,
        content,
        sourceUrl: link,
        isUpdated: false,
      });

      await article.save();
      console.log(`Saved: ${title}`);
    }

    console.log("Scraping completed");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

scrapeOldBlogs();
