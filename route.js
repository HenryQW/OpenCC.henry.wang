var express = require("express");
var router = express.Router();
var OpenCC = require("opencc");

const reconvert = str =>
  str
    .replace(/(\\u)(\w{1,4})/gi, $0 =>
      String.fromCharCode(
        parseInt(escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2"), 16)
      )
    )
    .replace(/(&#x)(\w{1,4});/gi, $0 =>
      String.fromCharCode(
        parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16)
      )
    )
    .replace(/(&#)(\d{1,6});/gi, $0 =>
      String.fromCharCode(
        parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2"), 16)
      )
    );

const convert = async (req, res) => {
  var schemes = [
    "s2t",
    "t2s",
    "s2tw",
    "tw2s",
    "s2hk",
    "hk2s",
    "s2twp",
    "tw2sp",
    "t2tw",
    "t2hk"
  ];

  var type = req.path.substr(1);

  if (type.length === 0) {
    type = "t2s";
  } else if (!schemes.includes(type)) {
    return res.status(200).json({
      title: "Error occured",
      content: "Wrong conversion scheme specified."
    });
  }

  try {
    const opencc = new OpenCC(`${type}.json`);

    const title = opencc.convertSync(reconvert(req.body.title || ""));
    const content = opencc.convertSync(reconvert(req.body.content || ""));

    return res.status(200).json({
      title,
      content
    });
  } catch (error) {
    return res.status(200).json({
      title: "Error occured",
      content: error.message
    });
  }
};

const redirect = (req, res) => {
  return res.redirect(301, "https://henry.wang/");
};

router.post("/*", convert);
router.get("/", redirect);

module.exports = router;
