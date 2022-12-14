const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const dbcon = require("../../dbConnection");

module.exports.userSignup = async (req, res, next) => {
  const { username, email, password, age, privacyrules } = req.body;
  console.log(username, email, password, age, privacyrules);
  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: "password encryption error",
        });
      } else {
        let sql = `INSERT INTO users ( username , email , password , age , privacyrules)VALUES ("${username}", "${email}", "${hash}", "${age}", "${privacyrules}")`;
        dbcon.query(sql, (err, result) => {
          if (err) {
            res.status(500).json({
              message: "User Not Added",
              error: err,
            });
          }
          if (result) {
            savedObj = {
              username,
              email,
              password,
              age,
              privacyrules,
            };
            const token = jwt.sign(savedObj, process.env.JWT_SESSION_KEY, {
              expiresIn: "5d",
            });

            res.status(201).json({
              message: "User Added",
              token: token,
              savedObj,
            });
          }
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

module.exports.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let sql = `SELECT * from users
               WHERE username = ?`;

    dbcon.query(sql, [username], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      if (result.length > 0) {
        console.log(result);
        bcrypt.compare(password, result[0].password, (err, bsresult) => {
          if (err) {
            return res.status(500).json({
              message: "password decryption error",
            });
          } else {
            if (bsresult === true) {
              savedObj = {
                username: result[0].username,
                email: result[0].email,
                password: result[0].password,
                age: result[0].age,
                privacyrules: result[0].privacyrules,
              };
              const loginToken = jwt.sign(
                savedObj,
                process.env.JWT_SESSION_KEY,
                {
                  expiresIn: "5d",
                }
              );
              res.status(200).json({
                message: "Login Successful",
                token: loginToken,
              });
            } else {
              return res.status(500).json({
                message: "Login failed",
              });
            }
          }
        });
      } else {
        res.status(200).json({
          message: "Invalid Email or Password",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      Error_Message: "Somthing wents wrongs",
      error,
    });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    let sql = `select * from users;`;
    dbcon.query(sql, (err, result) => {
      if (err) {
        res.json({
          message: err,
        });
      }
      if (result) {
        res.status(200).json({
          message: "users List",
          users: result,
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

module.exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE userId = ${id};`;
    dbcon.query(sql, [], (err, result) => {
      if (err) {
        res.json({
          message: err,
        });
      }
      if (result) {
        res.status(200).json({
          message: "User deleted successfully",
        });
      } else {
        res.status(500).json({
          message: "Something wents wrongs",
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
