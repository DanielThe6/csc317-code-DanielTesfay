const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const productController = require("../controllers/posts");

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new mongoose.Types.ObjectId() + file.originalname.replace(/\s/g, "")
    );
  },
});

const upload = multer({
  storage: storage,
  // , limits: {
  //     fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter: fileFilter
});

router.post("/addpost", upload.single("image"), productController.addPost);

router.post("/postcomment", productController.addPostComment);

router.get("/getposts", productController.getPosts);
router.get("/getpostcomments", productController.getPostComments);

module.exports = router;
