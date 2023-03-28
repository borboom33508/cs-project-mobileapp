// https://portal.infobip.com/homepage/

const useFetch = (phonenumber, otp_code) => {
  console.log(phonenumber, otp_code);
  fetch("https://19lp31.api.infobip.com/sms/2/text/advanced", {
    method: "POST",
    hostname: "19lp31.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "App 4f984a95564887480f80c719347b2656-151ff6fb-5a39-4352-a684-658365c4a0f5",
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
