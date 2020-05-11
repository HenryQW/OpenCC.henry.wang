const express = require("express");
const router = express.Router();
const OpenCC = require("opencc");

const SCHEMES = [
  "s2t",
  "t2s",
  "s2tw",
  "tw2s",
  "s2hk",
  "hk2s",
  "s2twp",
  "tw2sp",
  "t2tw",
  "t2hk",
];

const reconvert = (str) =>
  str
    .replace(/(\\u)(\w{1,4})/gi, ($0, $1, $2) =>
      String.fromCharCode(parseInt($2, 16))
    )
    .replace(/&#(x)?(\w+);/g, ($, $1, $2) =>
      String.fromCharCode(parseInt($2, $1 ? 16 : 10))
    );

const convert = (req, res) => {
  let type = req.path.substr(1);

  if (type.length === 0) {
    type = "t2s";
  } else if (!SCHEMES.includes(type)) {
    return res.status(200).json({
      title: "Error occured",
      content: "Wrong conversion scheme specified.",
    });
  }

  try {
    const opencc = new OpenCC(`${type}.json`);

    const title = opencc.convertSync(reconvert(req.body.title || ""));
    const content = opencc.convertSync(reconvert(req.body.content || ""));

    return res.status(200).json({
      title,
      content,
    });
  } catch (error) {
    return res.status(200).json({
      title: "Error occured",
      content: error.message,
    });
  }
};

const redirect = (req, res) => {
  return res.redirect(301, "https://github.com/HenryQW/OpenCC.henry.wang");
};

router.post("/*", convert);
router.get("/", redirect);

module.exports = router;
