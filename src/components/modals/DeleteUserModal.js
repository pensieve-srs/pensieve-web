import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

class DeleteUserModal extends Component {
  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Delete Card</Modal.Header>
        <Modal.Content>
          <p>
            <strong>Are you sure you want to delete your account?</strong>
            {"  "}
            There's no turning back.
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

DeleteUserModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DeleteUserModal;
