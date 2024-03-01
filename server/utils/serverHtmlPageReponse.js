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
              <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="Logo" width="auto" height="300rem">
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
      <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="Logo" width="auto" height="300rem">
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
       <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png" alt="Logo" width="auto" height="300rem">
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
      <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76911582/309322619-ae7a1384-4271-4fcd-8a6d-b9550fe5510e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240301T162228Z&X-Amz-Expires=300&X-Amz-Signature=59e0e0d6c34694f909544cde9e8ddf7bafa7db296c545fa3dcb7c0ca119b6a2b&X-Amz-SignedHeaders=host&actor_id=76911582&key_id=0&repo_id=398164641" alt="Logo" width="auto" height="300rem">
      <h4>${message}, Redirecting to FLIC in <span id="timer">5</span> seconds...</h4>
    </body>
  </html>

    `;
}

module.exports = { formResponseMiddlePage, linkMiddlePageNotFound, linkMiddlePageSuccess, userVerificationMiddlePage };
