import ReactGA from "react-ga";

ReactGA.initialize("UA-112756928-1");

function GoogleAnalytics() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
  return null;
}

export default GoogleAnalytics;
