// https://github.com/axios/axios#handling-errors
const handleErrors = (error, errorMap) => {
  let message = null;

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    message = errorMap[error.response.status];

    if (!message) { // A corresponding error message wasn't provided
      message = "Unable to fulfill request. Please try a valid url or go back.";
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    message = "There was an error making your request. Please check your connection.";
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    message = "An unknown error occurred.";
    console.log("Error", error.message);
  }
  console.log(error.config);
  return message;
};

export default handleErrors;