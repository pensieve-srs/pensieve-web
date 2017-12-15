import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Breadcrumb, Icon, Dropdown, Label } from "semantic-ui-react";

import * as api from "../itemActions";

import { DeleteItemModal, EditItemModal, ResetItemModal, MODAL_TYPES } from "../modals";

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
  } else if (date < new Date()) {
    // due item
    return "yellow";
  } else {
    // learning item
    return "grey";
  }
};

const getLabel = date => {
  if (!date) {
    return "New Card";
  } else if (new Date(date) < new Date()) {
    return "Due Card";
  } else {
    return "Learning";
  }
};

const ItemLabel = ({ date }) => {
  const color = getColor(date);
  const label = getLabel(date);

  return <Label color={color}>{label}</Label>;
};

class ItemHome extends Component {
  state = {
    item: {},
    showFront: false,
    showModalType: undefined,
  };

  componentWillMount() {
    const { itemId } = this.props.match.params;

    this.fetchItem(itemId);
  }

  onClick = () => this.setState({ showFront: !this.state.showFront });

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = modalType => this.setState({ showModalType: modalType });

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
                <Breadcrumb>
                  <Breadcrumb.Section link>
                    <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle" />
                  <Breadcrumb.Section active>Item</Breadcrumb.Section>
                </Breadcrumb>
                <Dropdown
                  on="click"
                  icon={false}
                  pointing="top right"
                  trigger={
                    <Button basic size="small">
                      <Icon name="ellipsis vertical" className="m-0" />
                    </Button>
                  }
                  style={{
                    right: "12px",
                    position: "absolute",
                    top: "12px",
                  }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.onShowModal(MODAL_TYPES.EDIT_ITEM)}>
                      Edit Item
                    </Dropdown.Item>
                    {item.nextReviewDate && (
                      <Dropdown.Item onClick={() => this.onShowModal(MODAL_TYPES.RESET_ITEM)}>
                        Reset Item
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={() => this.onShowModal(MODAL_TYPES.DELETE_ITEM)}>
                      Delete Item
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <hr />
              <div className="item-home-panel bg-white border rounded mb-2" onClick={this.onClick}>
                <div className="panel-face font-italic text-secondary">
                  {showFront ? <span>Front</span> : <span>Back</span>}
                </div>
                <ItemLabel date={item.nextReviewDate} />
                <h3 className="text-center my-5">{itemContent}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemHome;
