var mongoose = require("mongoose");
const dbcon = require("../../dbConnection");

module.exports.addPost = async (req, res) => {
  const { title, description, policy, createdAt, createdBy } = req.body;
  console.log(createdAt, createdBy);
  let productImage;
  // let loadFile;

  if (req?.file) {
    productImage = "/images/" + req?.file?.filename?.split(" ")?.join("");
  }

  try {
    let sql = `INSERT INTO posts ( title, description, policy, image, createdAt, createdBy )  VALUES ("${title}", "${description}", "${policy}", "${productImage}", "${createdAt}", "${createdBy}")`;
    dbcon.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Post Not Added",
          error: err,
        });
      }
      if (result) {
        res.status(201).json({
          message: "Post Added",
          savedProduct: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      Error_Message: "Somthing wents wrong",
      error,
    });
  }
};

module.exports.addPostComment = async (req, res) => {
  const { postId, postcomment, postedby } = req.body;
  console.log(postId, postcomment, postedby);

  try {
    let sql = `INSERT INTO postcomments ( postId, postcomment, postedby )  VALUES ("${postId}", "${postcomment}", "${postedby}")`;
    dbcon.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Comment Not Added",
          error: err,
        });
      }
      if (result) {
        res.status(201).json({
          message: "Comment Added",
          savedComment: { postId, postcomment, postedby },
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      Error_Message: "Somthing wents wrong",
      error,
    });
  }
};

module.exports.getPosts = async (req, res) => {
  try {
    let sql = `select * from posts;`;
    dbcon.query(sql, (err, result) => {
      if (err) {
        res.json({
          message: err,
        });
      }
      if (result) {
        res.status(200).json({
          message: "product List",
          posts: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      Error_Message: "Something wents wrongs",
      error,
    });
  }
};

module.exports.getPostComments = async (req, res) => {
  try {
    let sql = `select * from postcomments;`;
    dbcon.query(sql, (err, result) => {
      if (err) {
        res.json({
          message: err,
        });
      }
      if (result) {
        res.status(200).json({
          message: "comment List",
          posts: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      Error_Message: "Something wents wrongs",
      error,
    });
  }
};


