var express = require('express')
var app = express()
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter = require('./api/routes/user')
const postRouter = require('./api/routes/posts')



app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json({ limit: '50mb', extended: true }))
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
)
app.use('/images', express.static('api/images'))
///multer
app.use('/uploads', express.static(__dirname + '/uploads'))
//Chat

// add all routes connection
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use("/", (req, res) => {
  res.send("“Hello World, I am {{Daniel Tesfay}}”");
});


//db configuration

module.exports = app
// module.exports = connection
