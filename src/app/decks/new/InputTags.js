import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

const options = [
  { key: "books", value: "books", text: "Books", color: "yellow" },
  { key: "article", value: "article", text: "Articles", color: "blue" },
  { key: "video", value: "video", text: "Videos", color: "teal" },
];

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
];

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

class TagsInput extends Component {
  state = { options };

  renderLabel = (label, index, defaultLabelProps) => {
    defaultLabelProps.color = label.color;
    return label.text;
  };

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value, color: randomColor() }, ...this.state.options],
    });
  };

  handleChange = (e, { value }) => this.setState({ currentValue: value });

  render() {
    return (
      <Dropdown
        multiple
        search
        selection
        allowAdditions
        placeholder="Add tags for your deck..."
        options={this.state.options}
        value={this.state.currentValue}
        renderLabel={this.renderLabel}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
}

export default TagsInput;
