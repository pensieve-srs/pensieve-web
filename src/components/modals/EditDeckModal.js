import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal, Input, TextArea } from "semantic-ui-react";

class EditDeckModal extends Component {
  state = { ...this.props.deck };

  componentWillUpdate(nextProps) {
    if (this.props.deck !== nextProps.deck) {
      this.setState({ ...nextProps.deck });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = () => this.props.onSubmit(this.state);

  render() {
    const { title, description } = this.state;
    const { open, onClose } = this.props;

    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Edit Deck</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label htmlFor="front">Deck title</label>
              <Input
                onChange={this.onChange}
                value={title}
                name="title"
                placeholder="Add a deck title..."
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="back">Back</label>
              <TextArea
                onChange={this.onChange}
                value={description}
                name="description"
                autoHeight
                rows={4}
                placeholder="Add a deck description..."
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
