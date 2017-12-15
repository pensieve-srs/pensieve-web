import React, { Component } from "react";
import { Button, Form, Input, TextArea } from "semantic-ui-react";

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
        this.props.history.push(`/decks/${response.data.deck._id}`);
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { title, description } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
            <h1 className="h4 mb-3 text-center">Create a new study deck</h1>
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
                <Button onClick={this.onSubmit} primary fluid disabled={title.length === 0}>
                  Create Deck
                </Button>
                <Button className="mt-2" onClick={this.onCancel} fluid>
                  Cancel
                </Button>
              </Form.Field>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default DeckNew;
