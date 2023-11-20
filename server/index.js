require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const connectDB = require("./config/db");
const commonR = require("./apiRoutes/commonRoutes");
const Url = require("./models/url")
//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cookie parser
app.use(cookieParser())

// cors 
var whitelist = ['http://localhost:8082/', "http://localhost:3000/"]
var corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin);
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

// link redirection
app.get('/l/:id', async (req, res) => {
  try {
    var requestUrl = process.env["SERVER_ROOT_URL"] + req.originalUrl;
    let urlDocument = await Url.findOne({ shortenedURL: requestUrl });
    console.log(urlDocument)
    if(urlDocument){
      var link = urlDocument.originalURL;
      // We will not wait this to be updated
      const urlDocument = Url.updateOne({ _id: urlDocument._id }, {
        clickCount: 1 + urlDocument.clickCount
      });
      res.send(`
      <html>
          <head>
            <title>FLIC Waiting Page..</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 90vh;
                margin: 0;
              }
            </style>
            <script>
              // Display a countdown timer and redirect after 5 seconds
              let countdown = 5;
              function updateTimer() {
                document.getElementById('timer').innerText = countdown;
                countdown--;
  
                if (countdown < 0) {
                  window.location.href = '${link}';
                } else {
                  setTimeout(updateTimer, 1000);
                }
              }
              
              window.onload = function() {
                updateTimer();
              };
            </script>
          </head>
          <body>
            <img src="https://github.com/vasu-1/FLIC/assets/76911582/ad679078-7ba8-4cd9-8f1f-065ba17b538c" alt="Logo" width="auto" height="300rem">
            <h4>We are crunching your link in <span id="timer">5</span> seconds...</h4>
          </body>
        </html>
      `);
    }else{
      res.send(`
      <html>
          <head>
            <title>FLIC | No Such URL Exists</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 90vh;
                margin: 0;
              }
            </style>
          </head>
          <body>
            <img src="https://github.com/vasu-1/FLIC/assets/76911582/ad679078-7ba8-4cd9-8f1f-065ba17b538c" alt="Logo" width="auto" height="300rem">
            <h2>No Such URL Exists</h2>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());

// database connection
connectDB();

// routers
app.use("/api/v1", commonR);

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