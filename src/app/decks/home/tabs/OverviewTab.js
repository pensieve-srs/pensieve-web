import React from "react";
import marked from "marked";
import { Tab, Header, Divider } from "semantic-ui-react";

import { Octicon } from "../../../../components";

const OverviewTab = ({ deck, emoji = "✌️" }) => (
  <Tab.Pane padded="very">
    {deck.notes ? (
      <div>
        <Header>Notes</Header>
        <Divider />
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(deck.notes) }} />
      </div>
    ) : (
      <div className="blankslate blankslate-spacious">
        <Header size="large">
          {emoji} Missing notes
          <Header.Subheader className="text-secondary" style={{ lineHeight: "1.4em" }}>
            Use notes to capture additional information about your decks
          </Header.Subheader>
        </Header>
      </div>
    )}
  </Tab.Pane>
);

OverviewTab.MenuItem = () => ({
  key: "overview",
  icon: <Octicon name="graph" className="mr-1" />,
  content: <span className="font-weight-medium">Overview</span>,
});

export default OverviewTab;
