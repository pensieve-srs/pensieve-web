import React, { Component } from "react";
import { Button, Header, Input, Form, Tab, Dropdown, Segment, TextArea } from "semantic-ui-react";

import { MODAL_TYPES } from "../../../../components/modals";
import { Octicon } from "../../../../components";
import * as tagApi from "../../tagActions";

class SettingsTab extends Component {
  state = { deck: this.props.deck, options: [] };

  componentWillMount() {
    this.fetchTags();
  }

  componentWillUpdate(nextProps) {
    if (this.props.deck !== nextProps.deck) {
      this.setState({ deck: nextProps.deck });
    }
  }

  onSubmit = () => this.props.onSubmit(this.state.deck);

  onChange = e => {
    this.setState({ deck: { ...this.state.deck, [e.target.name]: e.target.value } });
  };

  onChangeTag = (e, data) => {
    const { value } = data;
    const { options } = this.state;
    const tags = value.filter(el => options.find(tag => tag.value === el));
    this.setState({ deck: { ...this.state.deck, tags } });
  };

  onAddTag = (e, { value }) => {
    this.createTag(value).then(tag => {
      const option = { text: tag.value, value: tag._id };
      this.setState({
        options: [option, ...this.state.options],
        deck: { ...this.state.deck, tags: [...this.state.deck.tags, tag._id] },
      });
    });
  };

  createTag = value => {
    return tagApi.createTag(value).then(({ data }) => data);
  };

  fetchTags = () => {
    tagApi.getTags().then(({ data }) => {
      const options = data.map(tag => ({ text: tag.value, value: tag._id }));
      this.setState({ options });
    });
  };

  render() {
    const { deck: { title, description, notes = "", tags = [] }, options } = this.state;

    const values = tags.map(el => el._id || el);

    return (
      <Tab.Pane padded="very">
        <Header>
          <Header.Content>Settings</Header.Content>
          <Header.Subheader>Update information and settings for this deck</Header.Subheader>
        </Header>
        <Segment style={{ boxShadow: "none" }} padded>
          <Form>
            <Form.Field>
              <label htmlFor="front">Title</label>
              <Input
                onChange={this.onChange}
                value={title}
                name="title"
                placeholder="Add a deck title..."
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Input
                value={description}
                onChange={this.onChange}
                name="description"
                placeholder="Add a short description for this deck..."
              />
            </Form.Field>
            <Form.Field>
              <label>Tags</label>
              <Dropdown
                value={values}
                placeholder="Add tags..."
                options={options}
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
              <label>Notes</label>
              <TextArea
                onChange={this.onChange}
                value={notes}
                name="notes"
                autoHeight
                rows={5}
                placeholder="Add additional notes for the deck..."
              />
            </Form.Field>
            <Form.Field className="mt-4">
              <Button primary basic onClick={this.onSubmit}>
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
            <Button negative basic onClick={this.props.onShowModal} value={MODAL_TYPES.RESET_DECK}>
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
            <Button negative basic onClick={this.props.onShowModal} value={MODAL_TYPES.DELETE_DECK}>
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
