import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { Dropdown, Label, Icon, Segment } from "semantic-ui-react";

import { DeleteItemModal, ResetItemModal, MODAL_TYPES } from "../../../components/modals";

class DeckItem extends Component {
  state = { showModalType: undefined };

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value, open: false });

  onGoto = () => this.props.history.push(`/items/${this.props.item._id}`);

  onReset = () => {
    this.props.resetItem(this.props.item._id);
    this.onCloseModal();
  };

  onDelete = () => {
    this.props.deleteItem(this.props.item._id);
    this.onCloseModal();
  };

  getColor = date => {
    if (!date) {
      // new item
      return "teal";
    } else if (new Date(date) < new Date()) {
      // due item
      return "yellow";
    } else {
      // learning item
      return "grey";
    }
  };

  render() {
    const { item } = this.props;
    const { showModalType } = this.state;
    const color = this.getColor(item.nextReviewDate);

    return (
      <Segment className="bg-white" onClick={this.onGoto} style={{ cursor: "pointer" }}>
        <DeleteItemModal
          open={showModalType === MODAL_TYPES.DELETE_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onDelete}
        />
        <ResetItemModal
          open={showModalType === MODAL_TYPES.RESET_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onReset}
        />
        <div className="row">
          <div className="col-9 col-sm-10">
            <div className="d-flex flex-column flex-md-row">
              <span className="col-md-5">{item.front}</span>
              <span className="d-none d-sm-block font-weight-bold col-md-7 mt-2 mt-md-0">
                {item.back}
              </span>
            </div>
          </div>
          <div className="col-3 col-sm-2">
            <div className="d-flex justify-content-end align-items-center">
              <Label color={color} circular empty className="mr-2" />
              <Dropdown
                on="click"
                icon={false}
                onClick={e => e.preventDefault()}
                pointing="top right"
                trigger={
                  <Icon
                    name="ellipsis horizontal"
                    size="large"
                    className="text-secondary mx-2 my-1"
                  />
                }
              >
                <Dropdown.Menu>
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
          </div>
        </div>
      </Segment>
    );
  }
}

DeckItem.propTypes = {
  item: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(DeckItem);
