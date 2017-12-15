import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class DeleteDeckModal extends Component {
  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Delete Deck</Modal.Header>
        <Modal.Content>
          <p>
            <strong>
              Deleting a deck will delete all of its cards. This action is irreversible.
            </strong>
            {"  "}
            Are you certain you want to delete them?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onSubmit} negative>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteDeckModal;
