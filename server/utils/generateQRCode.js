var QRCode = require("qrcode");

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

module.exports = { getQrCode };
