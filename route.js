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
        parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2"))
      )
    );

async function convert(req, res) {
  try {
    const opencc = new OpenCC("t2s.json");

    const title = opencc.convertSync(reconvert(req.body.title));
    const content = opencc.convertSync(reconvert(req.body.content));

    res.status(200).json({
      title,
      content
    });
  } catch (error) {
    console.log(`OpenCC ${error}: ${req.body.title}, ${req.body.content}`);

    res.status(200).json({
      title: req.body.title,
      content: req.body.content
    });
  }
}

router.post("/", convert);

module.exports = router;
