const express = require('express');
const router = express.Router();

const urlController = require("../controllers/url.js");

router.get("*", async (req, res) => {
  try {
    const url = await urlController.getUrlByShort(req.originalUrl.slice(1));
    if (url) {
      res.redirect(url.original);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;