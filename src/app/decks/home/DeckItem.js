import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button, Popup } from "semantic-ui-react";

import "./DeckItem.css";

const MODAL_TYPES = {
  RESET_ITEM: "resetItem",
  DELETE_ITEM: "deleteItem",
};

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

export default class DeckListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModalType: undefined };
    this.onShowModal = this.onShowModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onShowModal(modalType) {
    this.setState(() => ({ showModalType: modalType }));
  }

  onCloseModal() {
    this.setState(() => ({ showModalType: undefined }));
  }

  onDelete() {
    const { item } = this.props;
    this.props.actions.deleteItem(item._id);
    this.onCloseModal();
  }

  onReset() {
    const { item } = this.props;
    this.props.actions.resetItem(item._id);
    this.onCloseModal();
  }

  render() {
    const { item } = this.props;

    return (
      <div className="list-item-wrapper bg-white">
        <Link className="list-item" to={`/items/${item._id}`}>
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
              <TimeLeft date={item.nextReviewDate} />
              <Popup
                on="click"
                position="bottom right"
                trigger={
                  <Button onClick={e => e.preventDefault()} basic size="mini">
                    <i className="fa fa-ellipsis-h text-secondary" aria-hidden="true" />
                  </Button>
                }
                content={
                  <Button.Group vertical className="popover-actions">
                    {item.nextReviewDate && (
                      <Button onClick={() => this.onShowModal(MODAL_TYPES.RESET_ITEM)} basic fluid>
                        Reset Item
                      </Button>
                    )}
                    <Button onClick={() => this.onShowModal(MODAL_TYPES.DELETE_ITEM)} basic fluid>
                      Delete Item
                    </Button>
                  </Button.Group>
                }
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
