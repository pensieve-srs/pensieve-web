import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

class ResetCardModal extends Component {
  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Reset Card</Modal.Header>
        <Modal.Content>
          <p>
            <strong>
              Resetting a card will remove your study progress with it. This action is irreversible.
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

ResetCardModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetCardModal;
