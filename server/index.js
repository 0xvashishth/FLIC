require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const connectDB = require("./config/db");

//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cookie parser
app.use(cookieParser())

// cors 
var whitelist = ['http://localhost:8082/', "http://localhost:3000/"]
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
// To allow all traffic, use below
// app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());

// database connection
connectDB();

// routers

// Middleware
const middleware = (req, res, next) => {
  console.log("Hello my flic middleware!");
  next();
}

app.get('/',middleware, (req, res) => {
  res.send('Hello Flic!')
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));