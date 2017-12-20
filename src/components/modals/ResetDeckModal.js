import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

class ResetDeckModal extends Component {
  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Reset Deck</Modal.Header>
        <Modal.Content>
          <p>
            <strong>
              Resetting a deck will remove all your progress studying its cards. This action is
              irreversible.
            </strong>
            {"  "}
            Are you sure you want to reset them?
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

ResetDeckModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetDeckModal;
