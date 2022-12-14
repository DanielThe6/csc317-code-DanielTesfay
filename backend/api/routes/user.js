const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images'))
  },
  filename: function (req, file, cb) {
    cb(null, new mongoose.Types.ObjectId() + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  // , limits: {
  //     fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter: fileFilter
})

router.post('/login', userController.userLogin)
router.get('/getusers', userController.getUsers)
router.post('/adduser', userController.userSignup)

module.exports = router
