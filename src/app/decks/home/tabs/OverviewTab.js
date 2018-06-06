import React from "react";
import marked from "marked";
import { Tab, Header, Divider } from "semantic-ui-react";

import { Octicon } from "../../../../components";

const OverviewTab = ({ deck }) => (
  <Tab.Pane padded="very">
    <Header>Notes</Header>
    <Divider />
    {deck.notes && (
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(deck.notes) }} />
    )}
  </Tab.Pane>
);

OverviewTab.MenuItem = () => ({
  key: "overview",
  icon: <Octicon name="graph" className="mr-1" />,
  content: <span className="font-weight-medium">Overview</span>,
});

export default OverviewTab;
