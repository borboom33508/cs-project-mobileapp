// https://portal.infobip.com/homepage/

var https = require("follow-redirects").https;
var fs = require("fs");

require("dotenv").config();
const { AUTHORIZATION } = process.env;

function SendOTP({ phonenumber, otp_code }) {
  // const sendOTP = ({ phonenumber, otp_code }) => {

  // function getRandomArbitrary(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  // otp_code = getRandomArbitrary(1111, 9999).toString(); //String

  console.log(AUTHORIZATION, otp_code);

  var options = {
    method: "POST",
    hostname: "zjkr22.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization: "13131",
      // `${AUTHORIZATION}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    messages: [
      {
        destinations: [
          {
            to: `${phonenumber}`,
          },
        ],
        from: "Suck&Reed Service",
        text: `Suck&Reed Service: รหัส OTP ของคุณคือ ${otp_code}`,
      },
    ],
  });

  req.write(postData);
  req.end();
}

// sendOTP();
export default { SendOTP };
