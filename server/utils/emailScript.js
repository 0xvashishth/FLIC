const { eventNames } = require("../models/userDetails");

// Function to create a table row for each key-value pair in dynamic data
const createTableRows = (data) => {
  return Object.entries(data)
    .map(([key, value]) => {
      return `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${key}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${value}</td>
      </tr>
    `;
    })
    .join("");
};

function generateResponseEmailBodyForFormResponse(user, dynamicData) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Inline CSS for styling */
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #555;
          line-height: 1.6;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .signature {
          margin-top: 20px;
          font-weight: bold;
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Hello ${user.firstName},</h1>
        <p>Thank you for your submission. Below is the information you provided:</p>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${createTableRows(dynamicData)}
          </tbody>
        </table>
        <p>Best Regards,<br>FLIC</p>
      </div>
    </body>
    </html>
  `;
}

function userVerificationLinkMailScript(name, link) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FLIC - User Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .verification-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #4caf50;
            border-radius: 5px;
        }

        .header-img {
            width: 100%;
            max-width: 400px;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="FLIC Header" class="header-img">
        <h1>Welcome to FLIC!</h1>
        <p>Hey ${name}, </p>
        <p>Thank you for signing up. To verify your account, please click the button below:</p>
        <a href="${link}" class="verification-link">Verify Your Account</a>

        <p class="footer">If you did not sign up for FLIC, please ignore this email.</p>
    </div>
</body>
</html>

  `;
}

function userVerifiedLinkMailScript(name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FLIC - Verification Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .website-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
        }

        .header-img {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          border-radius: 5px;
      }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
    <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="FLIC Header" class="header-img">
        <h1>Congratulations! Your FLIC Account is Verified</h1>
        <p>Hey ${name},</p>
        <p>You can now enjoy our services. Click the button below to access your account:</p>
        
        <a href="https://app.flic.tech/" class="website-link">Visit FLIC Dashboard</a>

        <p class="footer">If you have any questions or need assistance, feel free to contact us.</p>
    </div>
</body>
</html>`;
}

function linkCreatedMailScript(name, linkName, originalURL, ShortenedUrl) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FLIC - Link Created Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header-img {
            width: 100%;
            max-width: 400px;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        
    </style>
</head>
<body>
    <div class="container">
        <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="FLIC Header" class="header-img">
        <h1>FLIC - Link Created</h1>
        <p>Hello ${name},</p>
        <p>You have created the link with following details.</p>
        <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Link name</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${linkName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Original Url</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${originalURL}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Shorten Url</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${ShortenedUrl}</td>
          </tr>
          </tbody></table>
        <p class="footer">Best regards,<br>Your FLIC Team</p>
    </div>
</body>
</html>

  
  `;
}

function formCreatedMailScript(name, formName, redirectUrl, customMessage) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FLIC - Form Created Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header-img {
            width: 100%;
            max-width: 400px;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        
    </style>
</head>
<body>
    <div class="container">
        <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="FLIC Header" class="header-img">
        <h1>FLIC - Form Created</h1>
        <p>Hello ${name},</p>
        <p>You have created the form with following details.</p>
        <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Form name</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Redirect Url</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${redirectUrl}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Custom Message</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${customMessage}</td>
          </tr>
          </tbody></table>
        <p class="footer">Best regards,<br>Your FLIC Team</p>
    </div>
  </body>
  </html>

  
  `;
}

function userResetPasswordLinkScript(name, link) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FLIC - Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header-img {
            width: 100%;
            max-width: 400px;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .reset-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #dc3545;
            border-radius: 5px;
        }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="FLIC Header" class="header-img">
        <h1>FLIC - Password Reset</h1>
        <p>Hey ${name}</p>
        <p>You've requested a password reset for your FLIC account. Click the button below to reset your password:</p>
        
        <a href="${link}" class="reset-link">Reset Your Password</a>

        <p class="footer">If you did not request a password reset, please ignore this email.</p>
    </div>
</body>
</html>

  `;
}


module.exports = {
  generateResponseEmailBodyForFormResponse,
  userVerificationLinkMailScript,
  userVerifiedLinkMailScript,
  userResetPasswordLinkScript,
  linkCreatedMailScript,
  formCreatedMailScript
};
