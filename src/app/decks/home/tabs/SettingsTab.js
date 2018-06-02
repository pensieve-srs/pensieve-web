import React, { Component } from "react";
import { Button, Header, Input, Form, Tab, Dropdown, Segment, TextArea } from "semantic-ui-react";

import { Octicon } from "../../../../components";

class SettingsTab extends Component {
  state = { deck: this.props.deck };

  render() {
    const { deck } = this.state;
    return (
      <Tab.Pane padded="very">
        <Header>
          <Header.Content>Settings</Header.Content>
          <Header.Subheader>Update information and settings for this deck</Header.Subheader>
        </Header>
        <Segment style={{ boxShadow: "none" }} padded>
          <Form>
            <Form.Field>
              <label>Deck title</label>
              <Input value={deck.title} />
            </Form.Field>
            <Form.Field>
              <label>Tagline</label>
              <Input value={deck.tagline} placeholder="Add a short description for this deck..." />
            </Form.Field>
            <Form.Field>
              <label>Tags</label>
              <Dropdown
                value={(deck.tags || []).map(el => el._id)}
                placeholder="Add tags..."
                options={deck.tags}
                fluid
                multiple
                search
                selection
                allowAdditions
                additionPosition="top"
                onAddItem={this.onAddTag}
                onChange={this.onChangeTag}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <TextArea
                onChange={this.onChange}
                value={deck.description}
                name="description"
                autoHeight
                rows={5}
                placeholder="Add a deck description..."
              />
            </Form.Field>
            <Form.Field className="mt-4">
              <Button primary basic>
                Update this deck
              </Button>
            </Form.Field>
          </Form>
        </Segment>
        <Header>Danger Zone</Header>
        <Segment.Group className="border border-danger" style={{ boxShadow: "none" }}>
          <Segment className="d-flex justify-content-between align-items-center">
            <Header size="tiny" className="m-0">
              <Header.Content>Reset this deck</Header.Content>
              <Header.Subheader>
                Reseting this deck will remove all of your progress studying its cards.
              </Header.Subheader>
            </Header>
            <Button negative basic>
              Reset this deck
            </Button>
          </Segment>
          <Segment className="d-flex justify-content-between align-items-center">
            <Header size="tiny" className="m-0">
              <Header.Content>Delete this deck</Header.Content>
              <Header.Subheader>
                Deleting a deck will permanently remove all of its cards.
              </Header.Subheader>
            </Header>
            <Button negative basic>
              Delete this deck
            </Button>
          </Segment>
        </Segment.Group>
      </Tab.Pane>
    );
  }
}

SettingsTab.MenuItem = () => ({
  key: "settings",
  icon: <Octicon name="gear" className="mr-1" />,
  content: <span className="font-weight-medium">Settings</span>,
});

export default SettingsTab;
