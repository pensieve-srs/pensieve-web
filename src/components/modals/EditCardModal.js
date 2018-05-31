import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal, TextArea, Input } from "semantic-ui-react";

class EditCardModal extends Component {
  state = { card: this.props.card };

  componentWillUpdate(nextProps) {
    if (this.props.card !== nextProps.card) {
      this.setState({ card: nextProps.card });
    }
  }

  onChange = e => this.setState({ card: { ...this.state.card, [e.target.name]: e.target.value } });

  onSubmit = () => this.props.onSubmit(this.state.card);

  render() {
    const { card: { front, back, notes = "" } } = this.state;
    const { open, onClose } = this.props;

    return (
      <Modal open={open} onClose={onClose} size="tiny" className="position-relative">
        <Modal.Header>Edit Card</Modal.Header>
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
            <Form.Field>
              <label htmlFor="notes">Notes</label>
              <Input
                onChange={this.onChange}
                value={notes}
                name="notes"
                placeholder="Additional notes..."
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

EditCardModal.propTypes = {
  open: PropTypes.bool,
  card: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditCardModal;
