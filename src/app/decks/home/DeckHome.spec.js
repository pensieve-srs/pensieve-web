import ReactDOM from "react-dom";
import DeckHome from "./DeckHome";
import { withRouter } from "react-router";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(withRouter(DeckHome), div);
});
