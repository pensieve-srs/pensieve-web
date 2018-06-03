import React from "react";
import { Tab, Header, Divider } from "semantic-ui-react";

import { Octicon } from "../../../../components";

const DescriptionTab = ({ deck }) => (
  <Tab.Pane padded="very">
    <Header>Description</Header>
    <Divider />
    <div>{deck.description}</div>
  </Tab.Pane>
);

DescriptionTab.MenuItem = () => ({
  key: "deck",
  icon: <Octicon name="book" className="mr-1" />,
  content: <span className="font-weight-medium">Deck</span>,
});

export default DescriptionTab;
