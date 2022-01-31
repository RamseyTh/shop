const router = require("express").Router();
const Util = require("../../../utils/utils");
var multer = require("multer");
var upload = multer({
  dest: "./public/temp", 
});
router.post(
  "/headPic",
  upload.single("headPic"), 
  Util.checkToken, 
  (req, res) => {
    if (req.file) {
      res.send({
        result: 1,
        msg: "Uploaded!",
        headPath: req.file,
      });
    } else {
      res.send({
        result: 0,
        msg: "Upload Failed!",
      });
    }

  }
);

module.exports = router;