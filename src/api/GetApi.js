// const BASEURL =
//   Platform.OS === "android"
//     ? "http://10.0.2.2/CS-PROJECT-BACKEND"
//     : "http://localhost/CS-PROJECT-BACKEND";

// SelectShopScreen line 66-74
// SelectServiceScreen line 82

const BASEURL = "https://75a7-2001-fb1-e9-5c1a-5567-ae55-5f32-7766.ap.ngrok.io"

export const API = {
  url: BASEURL + "/CS-PROJECT-BACKEND",
  urlCustomerImage: BASEURL + "/CS-PROJECT-BACKEND/customerAssets/",
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