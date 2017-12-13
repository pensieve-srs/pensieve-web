import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

class EditItemModal extends Component {
  state = { ...this.props.item };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = () => this.props.onSubmit(this.state);

  render() {
    const { front, back } = this.state;
    const { open, onClose } = this.props;

    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Edit Item</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label htmlFor="front">Front</label>
              <textarea
                value={front}
                onChange={this.onChange}
                name="front"
                type="text"
                placeholder="Add to the card front..."
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="back">Back</label>
              <textarea
                value={back}
                onChange={this.onChange}
                name="back"
                type="text"
                placeholder="Add to the card back..."
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

export default EditItemModal;
