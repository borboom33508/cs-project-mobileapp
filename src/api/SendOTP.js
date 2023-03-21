// https://portal.infobip.com/homepage/

const useFetch = (phonenumber, otp_code) => {
  console.log(phonenumber, otp_code);
  fetch("https://zjkr22.api.infobip.com/sms/2/text/advanced", {
    method: "POST",
    hostname: "zjkr22.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "App 7c81c14349ae51db3737ed6d39ef5934-d8d7e0d1-3ece-4fca-9311-6d7835dc63ab",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
    body: JSON.stringify({
      messages: [
        {
          destinations: [
            {
              to: `66${phonenumber}`,
            },
          ],
          from: "Suck$Reed",
          text: `Suck&Reed Service: รหัส OTP ของคุณคือ ${otp_code}`,
        },
      ],
    }),
  });
};

export default { useFetch };
