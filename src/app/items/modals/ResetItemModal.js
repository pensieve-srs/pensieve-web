import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class ResetItemModal extends Component {
  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Reset Item</Modal.Header>
        <Modal.Content>
          <p>
            <strong>
              Resetting a item will remove your study progress with it. This action is irreversible.
            </strong>
            {"  "}
            Are you sure you want to reset it?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onSubmit} negative>
            Reset
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ResetItemModal;
