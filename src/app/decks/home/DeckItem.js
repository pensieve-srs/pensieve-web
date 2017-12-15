import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Label, Icon, Segment } from "semantic-ui-react";

import { DeleteItemModal, ResetItemModal, MODAL_TYPES } from "../../items/modals";

export default class DeckListItem extends React.Component {
  state = { showModalType: undefined };

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = modalType => this.setState({ showModalType: modalType, open: false });

  onReset = () => {
    const itemId = this.props.item._id;
    this.props.resetItem(itemId);
    this.onCloseModal();
  };

  onDelete = () => {
    const itemId = this.props.item._id;
    this.props.deleteItem(itemId);
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
      <Segment className="bg-white">
        <Link className="text-dark" to={`/items/${item._id}`}>
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
            <div className="d-flex justify-content-end align-items-start col-3 col-sm-2">
              <Label color={color} circular empty className="mr-3 mt-2" />
              <Dropdown
                on="click"
                icon={false}
                onClick={e => e.preventDefault()}
                pointing="top right"
                trigger={
                  <Button basic size="small">
                    <Icon name="ellipsis horizontal" className="m-0" />
                  </Button>
                }
              >
                <Dropdown.Menu>
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
          </div>
        </Link>
      </Segment>
    );
  }
}
