const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

// config dotenv file
dotenv.config({ path: './config/config.env' })

// connecting to mongo
connectDB()

const app = express()

app.use('/images', express.static(path.join(__dirname,"public/images")))

// body parsers
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/posts', require('./routes/post'))
app.use('/api/conversations', require('./routes/conversation'))
app.use('/api/messages', require('./routes/message'))

app.get('/', (req, res) => {
    res.send('Welcome to our Home Page.')
})

const PORT = process.env.PORT || 8800
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))