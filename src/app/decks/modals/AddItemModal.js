import React, { Component } from "react";
import { Button, Form, Modal, TextArea } from "semantic-ui-react";

class AddItemModal extends Component {
  state = { ...this.props.item };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = () => this.props.onSubmit(this.state);

  render() {
    const { front, back } = this.state;
    const { open, onClose } = this.props;

    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Add Card</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label htmlFor="front">Front</label>
              <TextArea
                value={front}
                onChange={this.onChange}
                name="front"
                autoHeight
                rows={4}
                placeholder="Add to the card front..."
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="back">Back</label>
              <TextArea
                onChange={this.onChange}
                value={back}
                name="back"
                autoHeight
                rows={4}
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

export default AddItemModal;
