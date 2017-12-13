import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import * as api from "../itemActions";

import { DeleteItemModal, EditItemModal, ResetItemModal } from "../modals";

import ItemOverflow from "./ItemOverflow";

import "./ItemHome.css";

const MODAL_TYPES = {
  RESET_ITEM: "resetItem",
  DELETE_ITEM: "deleteItem",
  EDIT_ITEM: "editItem",
};

const EmptyView = () => (
  <div className="item-home pt-5 pb-5">
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

const TimeLeft = ({ date }) => {
  if (!date) {
    return (
      <div className="time-left badge badge-info mr-2" style={{ padding: "6px" }}>
        <span>new card</span>
      </div>
    );
  }

  if (moment(date).isBefore(moment())) {
    return (
      <div className="time-left badge badge-warning mr-2" style={{ padding: "6px" }}>
        <span>review due</span>
      </div>
    );
  }

  return (
    <div className="time-left badge badge-secondary mr-2" style={{ padding: "6px" }}>
      <span>review later</span>
    </div>
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

    this.onFetch(itemId);
  }

  onClick = () => this.setState({ showFront: !this.state.showFront });

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = modalType => this.setState({ showModalType: modalType });

  onFetch = itemId => {
    api.fetchItem(itemId).then(
      response => {
        this.setState(() => ({ item: response.data.item }));
      },
      error => {
        console.log("error", error);
      },
    );
  };

  onEdit = item => {
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

  onDelete = () => {
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

  onReset = () => {
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
      <div className="item-home pt-5 pb-5">
        <DeleteItemModal
          open={showModalType === MODAL_TYPES.DELETE_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onDelete}
        />
        <EditItemModal
          item={item}
          open={showModalType === MODAL_TYPES.EDIT_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onEdit}
        />
        <ResetItemModal
          open={showModalType === MODAL_TYPES.RESET_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onReset}
        />
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="item-home-header d-flex">
                <div>
                  <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
                  <span className="m-2">{">"}</span>
                  <span className="m-0">Item</span>
                </div>
                <ItemOverflow item={item} onShowModal={this.onShowModal} />
              </div>
              <hr />
              <div className="item-home-panel bg-white border rounded mb-2" onClick={this.onClick}>
                <div className="panel-face font-italic text-secondary">
                  {showFront ? <span>Front</span> : <span>Back</span>}
                </div>
                <TimeLeft date={item.nextReviewDate} />
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
