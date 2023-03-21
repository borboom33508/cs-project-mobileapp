// const BASEURL =
//   Platform.OS === "android"
//     ? "http://10.0.2.2/CS-PROJECT-BACKEND"
//     : "http://localhost/CS-PROJECT-BACKEND";

// SelectShopScreen line 66-74
// SelectServiceScreen line 82


const BASEURL = "https://8d8a-223-24-93-16.ap.ngrok.io"

export const API = {
  url: BASEURL + "/CS-PROJECT-BACKEND",
  urlLaundryImage: BASEURL + "/CS-PROJECT-BACKEND/laundryAssets/",
  urlRiderImage: BASEURL + "/CS-PROJECT-BACKEND/riderAssets/",
};

const useFetch = async (method, body, path) => {

  var requestOptions = {
    method: method,
    body: body,
    redirect: "follow",
  };

  return await fetch(API.url + path, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

export default { useFetch };
