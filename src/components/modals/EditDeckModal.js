import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal, Input, TextArea, Dropdown } from "semantic-ui-react";

import * as tagApi from "../../app/decks/tagActions";

class EditDeckModal extends Component {
  state = { deck: this.props.deck };

  componentWillMount() {
    this.fetchTags();
  }

  componentWillUpdate(nextProps) {
    if (this.props.deck !== nextProps.deck) {
      this.setState({ deck: nextProps.deck });
    }
  }

  onChange = e => {
    this.setState({ deck: { ...this.state.deck, [e.target.name]: e.target.value } });
  };

  onSubmit = () => this.props.onSubmit(this.state.deck);

  onAddTag = (e, { value }) => {
    this.createTag(value).then(tag => {
      const option = { text: tag.value, value: tag._id };
      this.setState({
        options: [option, ...this.state.options],
        deck: { ...this.state.deck, tags: [...this.state.deck.tags, tag._id] },
      });
    });
  };

  onChangeTag = (e, data) => {
    const { value } = data;
    const { options } = this.state;
    const tags = value.filter(el => options.find(tag => tag.value === el));
    this.setState({ deck: { ...this.state.deck, tags } });
  };

  fetchTags = () => {
    tagApi.getTags().then(({ data }) => {
      const options = data.map(tag => ({ text: tag.value, value: tag._id }));
      this.setState({ options });
    });
  };

  createTag = value => {
    return tagApi.createTag(value).then(({ data }) => data);
  };

  render() {
    const { deck: { title, description, tags = [] }, options = [] } = this.state;
    const { open, onClose } = this.props;

    const values = tags.map(el => el._id || el);

    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Edit Deck</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label htmlFor="front">Title</label>
              <Input
                onChange={this.onChange}
                value={title}
                name="title"
                placeholder="Add a deck title..."
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="back">Description</label>
              <TextArea
                onChange={this.onChange}
                value={description}
                name="description"
                autoHeight
                rows={4}
                placeholder="Add a deck description..."
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
                upward
                additionPosition="top"
                onAddItem={this.onAddTag}
                onChange={this.onChangeTag}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={this.onSubmit} primary>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

EditDeckModal.propTypes = {
  open: PropTypes.bool,
  deck: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditDeckModal;
