import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal, TextArea } from "semantic-ui-react";

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
            <Form.Field required>
              <label htmlFor="front">Front</label>
              <TextArea
                rows={4}
                name="front"
                value={front}
                onChange={this.onChange}
                autoHeight
                placeholder="Add to the card front..."
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="back">Back</label>
              <TextArea
                rows={4}
                name="back"
                value={back}
                onChange={this.onChange}
                autoHeight
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

EditItemModal.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditItemModal;
