import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Segment, Dropdown } from "semantic-ui-react";

import withErrors from "../../../helpers/withErrors";

import * as api from "../deckActions";
import * as tagApi from "../tagActions";

class DeckNew extends Component {
  state = {
    title: "",
    description: "",
    options: [],
    selectedTags: [],
  };

  componentWillMount() {
    this.fetchTags();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => this.createDeck();

  onCancel = () => this.props.history.push("/decks");

  onAddTag = (e, { value }) => {
    this.createTag(value).then(tag => {
      const option = { text: tag.value, value: tag._id };
      this.setState({
        options: [option, ...this.state.options],
        selectedTags: [...this.state.selectedTags, tag._id],
      });
    });
  };

  onChangeTag = (e, data) => {
    const { value } = data;
    const { options } = this.state;
    const tags = value.filter(el => options.find(tag => tag.value === el));
    this.setState({ selectedTags: tags });
  };

  fetchTags = () => {
    tagApi.getTags().then(({ data }) => {
      const options = data.map(tag => ({ text: tag.value, value: tag._id }));
      this.setState({ options });
    });
  };

  createDeck = () => {
    const { title, description, selectedTags } = this.state;
    api.createDeck({ title, description, tags: selectedTags }).then(response => {
      this.props.history.push(`/decks/${response.data._id}`);
    });
    this.setState(state => ({ title: "", description: "",  selectedTags: []}));
  };

  createTag = value => {
    return tagApi.createTag(value).then(({ data }) => data);
  };

  render() {
    const { title, description, options, selectedTags } = this.state;

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <Segment>
              <h1 className="h4 mb-3 text-center font-weight-bold">Create a new deck</h1>
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
                  <Input
                    value={description}
                    onChange={this.onChange}
                    name="description"
                    placeholder="Add a short description for this deck..."
                  />
                </Form.Field>
                <Form.Field>
                  <label>Tags</label>
                  <Dropdown
                    value={selectedTags}
                    placeholder="Add tags..."
                    options={options}
                    fluid
                    multiple
                    search
                    selection
                    allowAdditions
                    onAddItem={this.onAddTag}
                    onChange={this.onChangeTag}
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

export default withErrors(DeckNew);
