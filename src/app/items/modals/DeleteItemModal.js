import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class DeleteItemModal extends Component {
  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Delete Item</Modal.Header>
        <Modal.Content>
          <p>
            <strong>
              Deleting a item will remove it permanently. This action is irreversible.
            </strong>
            {"  "}
            Are you certain you want to delete it?
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

export default DeleteItemModal;
