const express = require('express');
const router = express.Router();

const urlController = require("../controllers/url.js");

router.get("/", async (req, res) => {
  try {
    const allUrls = await urlController.getAllUrls();
    res.send(allUrls);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/*", async (req, res) => {
  try {
    const url = await urlController.getUrlByShort(req.originalUrl.slice(5));
    if (!url) {
      res.status(400).send({ message: "That short URL is not saved" });
      return;
    }
    res.status(200).send(url);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const url = await urlController.addNewUrl(req.body.url);
    console.log(req.rawHeaders[13], url.short);
    console.log(url);
    res.status(200).send({ ...url, newUrl: req.rawHeaders[13] + url.short, check: JSON.stringify(req) });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const result = await urlController.deleteUrls(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;