// const baseUrl =
//   Platform.OS === "android"
//     ? "http://10.0.2.2/CS-PROJECT-BACKEND"
//     : "http://localhost/CS-PROJECT-BACKEND";

const baseUrl = "https://6b4b-223-24-95-137.ap.ngrok.io/CS-PROJECT-BACKEND"

const useFetch = async (method, body, path) => {

  var requestOptions = {
    method: method,
    body: body,
    redirect: "follow",
  };

  return await fetch(baseUrl + path, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

export default { useFetch };
