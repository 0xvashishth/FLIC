function formResponseMiddlePage(link, message) {
  return `
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
              <img src="https://flic.vercel.app/logo.png" alt="Logo" width="auto" height="300rem">
              <h4>${message}, Redirecting in <span id="timer">5</span> seconds...</h4>
            </body>
          </html>
    `;
}

function linkMiddlePageNotFound() {
  return `
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
      <img src="https://flic.vercel.app/logo.png" alt="Logo" width="auto" height="300rem">
      <h2>No Such URL Exists</h2>
    </body>
  </html>

    `;
}

function linkMiddlePageSuccess(link) {
  return `
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
       <img src="https://flic.vercel.app/logo.png" alt="Logo" width="auto" height="300rem">
      <h4>We are crunching your link in <span id="timer">5</span> seconds...</h4>
    </body>
  </html>
    `;
}

function userVerificationMiddlePage(message, link){
    return `
    
    <html>
    <head>
      <title>FLIC Verification Page..</title>
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
      <img src="https://flic.vercel.app/logo.png" alt="Logo" width="auto" height="300rem">
      <h4>${message}, Redirecting to FLIC in <span id="timer">5</span> seconds...</h4>
    </body>
  </html>

    `;
}

module.exports = { formResponseMiddlePage, linkMiddlePageNotFound, linkMiddlePageSuccess, userVerificationMiddlePage };
