import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, TextArea, Segment } from "semantic-ui-react";

import * as api from "../deckActions";

class DeckNew extends Component {
  state = {
    title: "",
    description: "",
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => this.createDeck();

  onCancel = () => this.props.history.push("/decks");

  createDeck = () => {
    const { title, description } = this.state;
    api.createDeck({ title, description }).then(
      response => {
        this.props.history.push(`/decks/${response.data._id}`);
      },
      error => {
        this.props.onError("Oops! Something went wrong.");
      },
    );
  };

  render() {
    const { title, description } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 col-md-8 offset-md-2">
            <Segment>
              <h1 className="h4 mb-3 text-center font-weight-bold">Create a new study deck</h1>
              <Form>
                <Form.Field required>
                  <label>Deck title</label>
                  <Input
                    value={title}
                    onChange={this.onChange}
                    name="title"
                    placeholder="Add a deck title..."
                  />
                </Form.Field>
                <Form.Field>
                  <label>Deck description</label>
                  <TextArea
                    value={description}
                    onChange={this.onChange}
                    name="description"
                    autoHeight
                    placeholder="Add a deck description..."
                  />
                </Form.Field>
                <Form.Field className="mt-4">
                  <Button onClick={this.onSubmit} primary fluid>
                    Create Deck
                  </Button>
                </Form.Field>
              </Form>
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

DeckNew.propTypes = {
  history: PropTypes.object.isRequired,
};

export default DeckNew;
