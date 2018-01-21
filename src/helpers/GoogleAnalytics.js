import { Component } from "react";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

export function logSignupEvent(userId) {
  ReactGA.event({
    category: "User",
    action: "created",
  });
}

class GoogleAnalytics extends Component {
  render() {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
    return null;
  }
}

export default GoogleAnalytics;
