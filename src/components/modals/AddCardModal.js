import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal, TextArea, Label } from "semantic-ui-react";

class AddItemModal extends Component {
  state = { front: "", back: "", numCards: 0 };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onClose = () => {
    this.props.onClose();
    this.setState(state => ({ front: "", back: "", numCards: 0 }));
  };

  onSubmit = () => {
    this.props.onSubmit(this.state);
    this.setState(state => ({ front: "", back: "", numCards: state.numCards + 1 }));
  };

  render() {
    const { front, back, numCards } = this.state;
    const { open } = this.props;

    return (
      <Modal open={open} onClose={this.onClose} size="tiny" className="position-relative">
        <Modal.Header>
          <div className="d-flex justify-content-between">
            <div>Create Cards</div>
            {numCards > 0 && <Label>+{numCards} cards</Label>}
          </div>
        </Modal.Header>
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
          <Button onClick={this.onClose}>Cancel</Button>
          <Button onClick={this.onSubmit} primary>
            Create Card
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddItemModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddItemModal;
