const UrlModel = require("../models/url.js");
const utils = require("../utils/shorter.js");

const getAllUrls = async () => {
  return await UrlModel.find();
}

const getUrlByShort = async (shortUrl) => {
  const url = await UrlModel.findOne({ short: shortUrl });
  return url;
}

const getUrlByOriginal = async (originalUrl) => {
  const url = await UrlModel.findOne({ original: originalUrl });
  return url;
}

const addNewUrl = async (url) => {
  let newShortUrl = utils.randomShort();
  while (await getUrlByShort(newShortUrl)) {
    newShortUrl = utils.randomShort();
  }
  const oldUrl = await getUrlByOriginal(url);
  if (oldUrl) {
    return oldUrl;
  }
  const newUrl = new UrlModel({
    original: url,
    short: newShortUrl
  });
  await newUrl.save();
  return newUrl;
}

const deleteUrls = async (filter) => {
  const result = await UrlModel.deleteMany(filter);
  return result;
}

module.exports = {
  getAllUrls, addNewUrl, getUrlByShort, deleteUrls
}