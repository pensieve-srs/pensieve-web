import React from "react";
import { Tab, Header, Divider } from "semantic-ui-react";

import { Octicon } from "../../../../components";

const OverviewTab = ({ deck }) => (
  <Tab.Pane padded="very">
    <Header>Notes</Header>
    <Divider />
    <div>{deck.notes}</div>
  </Tab.Pane>
);

OverviewTab.MenuItem = () => ({
  key: "overview",
  icon: <Octicon name="graph" className="mr-1" />,
  content: <span className="font-weight-medium">Overview</span>,
});

export default OverviewTab;
