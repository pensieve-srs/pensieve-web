import React, { Component } from "react";
import { Button, Popup } from "semantic-ui-react";

class ItemOverflow extends Component {
  state = { open: false };

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  onClick = e => {
    this.props.onShowModal(e.target.name);
    this.setState({ open: false });
  };

  render() {
    const { item } = this.props;
    const { open } = this.state;

    return (
      <Popup
        on="click"
        open={open}
        onClose={this.onClose}
        onOpen={this.onOpen}
        position="bottom right"
        trigger={
          <Button basic size="small">
            <i className="fa fa-ellipsis-v fa-lg" aria-hidden="true" />
          </Button>
        }
        content={
          <Button.Group vertical>
            <Button onClick={this.onClick} name="editItem" basic>
              Edit Card
            </Button>
            {item.nextReviewDate && (
              <Button onClick={this.onClick} name="resetItem" basic>
                Reset Card
              </Button>
            )}
            <Button onClick={this.onClick} name="deleteItem" basic>
              Delete Card
            </Button>
          </Button.Group>
        }
      />
    );
  }
}

export default ItemOverflow;
