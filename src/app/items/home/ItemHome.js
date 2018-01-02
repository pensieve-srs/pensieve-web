import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon, Dropdown, Header, Label, Segment } from "semantic-ui-react";

import * as api from "../itemActions";

import {
  DeleteItemModal,
  EditItemModal,
  ResetItemModal,
  MODAL_TYPES,
} from "../../../components/modals";

import "./ItemHome.css";

const EmptyView = () => (
  <div className="item-home">
    <div className="col-md-8 offset-md-2 text-center">
      <span style={{ fontSize: "80px", fontWeight: "bold" }} role="img" aria-label="jsx-a11y">
        😅
      </span>
      <h3 style={{ marginBottom: "40px" }}>Oops, that item does not seem to exist.</h3>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  </div>
);

const getColor = date => {
  if (!date) {
    // new item
    return "teal";
  } else if (new Date(date) < new Date()) {
    // due item
    return "orange";
  } else {
    // learning item
    return "grey";
  }
};

const getLabel = date => {
  if (!date) {
    return "New Card";
  } else if (new Date(date) < new Date()) {
    return "Weak Card";
  } else {
    return "Learning";
  }
};

const ItemLabel = ({ date }) => {
  const color = getColor(date);
  const label = getLabel(date);

  return (
    <Label className="item-label" color={color}>
      {label}
    </Label>
  );
};

class ItemHome extends Component {
  state = {
    item: {},
    showFront: false,
    showModalType: undefined,
  };

  componentWillMount() {
    const { itemId } = this.props.match.params;

    if (itemId) {
      this.fetchItem(itemId);
    }
  }

  onClick = () => this.setState({ showFront: !this.state.showFront });

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  onGoto = (event, data) => this.props.history.push(data.value);

  fetchItem = itemId => {
    api.fetchItem(itemId).then(
      response => {
        this.setState(() => ({ item: response.data.item }));
      },
      error => {
        console.log("error", error);
      },
    );
  };

  editItem = item => {
    api.editItem(item).then(
      response => {
        this.setState({ item: response.data.item });
        this.onCloseModal();
      },
      error => {
        console.log("error", error);
      },
    );
  };

  deleteItem = () => {
    const { item } = this.state;
    api.deleteItem(item._id).then(
      response => {
        this.props.history.go(-1);
      },
      error => {
        console.log("error", error);
      },
    );
  };

  resetItem = () => {
    const { item } = this.state;
    api.resetItem(item._id).then(
      response => {
        this.setState({ item: response.data.item });
        this.onCloseModal();
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { item, showFront, showModalType } = this.state;
    const { deck } = item;

    if (!item || Object.keys(item).length === 0) {
      return <EmptyView />;
    }

    const itemContent = showFront ? item.front : item.back;

    return (
      <div className="item-home">
        <DeleteItemModal
          open={showModalType === MODAL_TYPES.DELETE_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.deleteItem}
        />
        <EditItemModal
          item={item}
          open={showModalType === MODAL_TYPES.EDIT_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.editItem}
        />
        <ResetItemModal
          open={showModalType === MODAL_TYPES.RESET_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.resetItem}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="item-home-header d-flex">
                <Header as="h3" className="text-uppercase m-0">
                  Item
                </Header>
                <Dropdown
                  on="click"
                  icon={false}
                  pointing="top right"
                  trigger={
                    <Icon name="ellipsis vertical" size="large" className="text-secondary mx-2" />
                  }
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.EDIT_ITEM}>
                      Edit Item
                    </Dropdown.Item>
                    {item.nextReviewDate && (
                      <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.RESET_ITEM}>
                        Reset Item
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.DELETE_ITEM}>
                      Delete Item
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <hr className="my-2" />
              <Segment className="item-home-panel mb-2" padded onClick={this.onClick}>
                <Label attached="bottom" onClick={this.onGoto} value={`/decks/${deck._id}`} as="a">
                  {deck.title}
                </Label>
                <Label attached="bottom right">{showFront ? "Front" : "Back"}</Label>
                <ItemLabel date={item.nextReviewDate} />
                <h3 className="text-center my-5">{itemContent}</h3>
              </Segment>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ItemHome.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ItemHome;
