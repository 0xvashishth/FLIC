function isUrlExpired(creationDate) {
  // Calculate the current date
  const currentDate = new Date();

  // Calculate the date 6 months from the creation date
  const expirationDate = new Date(creationDate);
  expirationDate.setMonth(expirationDate.getMonth() + process.env["FREE_USER_URL_DEFAULT_EXP_MONTH"]);

  // Compare the current date with the expiration date
  return currentDate > expirationDate;
}

// const creationDate = new Date("2023-05-15"); // Replace with the actual creation date
// const isExpired = isUrlExpired(creationDate);

// if (isExpired) {
//   console.log("The URL has expired.");
// } else {
//   console.log("The URL is still valid."); // this will be returned!
// }
console.log(new Date(Date.now()).getDate());