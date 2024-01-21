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
}

function generateResponseEmailBody(user, dynamicData) {
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


module.exports = {generateResponseEmailBody}