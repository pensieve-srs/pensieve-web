import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "primer-markdown/build/build.css";
import "primer-blankslate/build/build.css";

import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
