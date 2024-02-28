require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/db");
const commonR = require("./apiRoutes/commonRoutes");
const Url = require("./models/url");
const Form = require("./models/form");
const User = require("./models/user");
const FormRequestDetails = require("./models/formRequestDetails");
var { sendEmail } = require("./utils/sendEmail");
const mongoose = require("mongoose");
const { generateResponseEmailBody } = require("./utils/emailForFormResponse");
const { addDataToLogs } = require("./controllers/log-controller");
const existingUser = require("./middlewares/existingUserValidation");
var QRCode = require("qrcode");

//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cookie parser
app.use(cookieParser());

// cors
var whitelist = [
  "http://localhost:3000",
  "https://flic.vercel.app",
  "https://flic-7tcx.vercel.app",
];
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log(origin);
//     if (!origin || whitelist.indexOf(origin) === -1) {
//       return callback(new Error('Not allowed by CORS'));
//     } else {
//       return callback(null, true);
//     }
//   }
// }

// before using the cors, I want to add the form data that will be using the redirection

// app.use(cors(corsOptions));
// To allow all traffic, use below
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(cors(corsOptions)) // Use this after the variable declaration

// link redirection
app.get("/l/:id", async (req, res) => {
  try {
    var SuffixId = req.params.id;
    // var requestUrl = process.env["SERVER_ROOT_URL"] + "/l/" + SuffixId;
    let urlDocument = await Url.findOne({ shortenedSuffix: SuffixId });
    if (!urlDocument.isActive || urlDocument.isBanned) {
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
    } else if (urlDocument) {
      var link = urlDocument.originalURL;
      if (link) {
        if (!link.includes("://")) {
          link = "http://" + link;
        }
      } else {
        link = process.env["CLIENT_ROOT_URL"];
      }
      // We will not wait this to be updated
      await Url.updateOne(
        { _id: urlDocument._id },
        {
          clickCount: 1 + urlDocument.clickCount,
        }
      );
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
                window.location.href = '${link}'
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
    } else {
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
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
// form response
app.post("/f/:id", async (req, res) => {
  const formId = req.params.id;
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();
  console.log("This comes the response: ", formId);
  try {
    // Validate if the form with the given ID exists
    const existingForm = await Form.findById(formId);
    if (!existingForm) {
      await session.abortTransaction(); // Abort the transactionCommit the transaction
      session.endSession();
      return res.status(404).json({ error: "Form not found" });
    }
    var link = existingForm.redirectUrl;
    if (link) {
      if (!link.includes("://")) {
        link = "http://" + link;
      }
    } else {
      link = process.env["CLIENT_ROOT_URL"];
    }

    if (!existingForm.isEnabled) {
      await session.abortTransaction(); // Abort the transactionCommit the transaction
      session.endSession();
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
            <h4>Form is not enabled, Redirecting in <span id="timer">5</span> seconds...</h4>
          </body>
        </html>
      `);
    } else {
      const user = await User.findById(existingForm.userID);
      const userEmail = user.email;
      // Extract dynamic data from the request body
      const dynamicData = req.body;
      // Create a new form request details instance
      const formDetails = new FormRequestDetails({
        FormID: formId,
        dynamicData: dynamicData,
        requestOrigin: req.headers.origin,
        // You can set other parameters here based on your requirements
      });

      // not sending the email RN
      if (existingForm.isEmailNotification) {
        console.log("email sending..!");
        await sendEmail(
          "You got Response From FLIC Form",
          [userEmail],
          generateResponseEmailBody(user, dynamicData)
        )
          .then(async () => {
            await addDataToLogs("Form Response", formDetails._id);
          })
          .catch((error) => {
            throw error;
          });
      }

      // Save the form request details to the database
      await formDetails.save();

      // Update the request count in the main form document
      existingForm.requestCount += 1;
      await existingForm.save();

      // Respond with a success message
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
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
              <h4>${existingForm.customMessage}, Redirecting in <span id="timer">5</span> seconds...</h4>
            </body>
          </html>
        `);
    }
  } catch (error) {
    await session.abortTransaction(); // Abort the transactionCommit the transaction
    session.endSession();
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());

// database connection
connectDB();

// routers
app.use("/api/v1", commonR);

app.get("/", (req, res) => {
  res.send("Hello Flic!");
});

function getQrCode(data, lightParam, darkParam) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(
      data,
      { color: { dark: darkParam, light: lightParam } },
      (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      }
    );
  });
}

app.get("/getqr", async (req, res) => {
  try {
    const lightParam = req.query["light"];
    const dataParam = req.query["data"];
    const darkParam = req.query["dark"];
    const url = await getQrCode(dataParam, lightParam, darkParam);
    return res.json({
      pngFile: url,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: "Failed to generate QR code",
    });
  }
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
