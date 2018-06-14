import React, { Component } from "react";
import marked from "marked";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { Dropdown, Icon, Segment, Popup } from "semantic-ui-react";

import { DeleteCardModal, ResetCardModal, MODAL_TYPES } from "../../../components/modals";
import { ProgressBar } from "../../../components";

class CardItem extends Component {
  state = { showModalType: undefined };

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value, open: false });

  onGoto = () => this.props.history.push(`/cards/${this.props.card._id}`);

  onReset = () => {
    this.props.resetCard(this.props.card._id);
    this.onCloseModal();
  };

  onDelete = () => {
    this.props.deleteCard(this.props.card._id);
    this.onCloseModal();
  };

  render() {
    const { card, onClick } = this.props;
    const { showModalType } = this.state;

    return (
      <Segment vertical onClick={onClick} style={{ cursor: "pointer" }}>
        <DeleteCardModal
          open={showModalType === MODAL_TYPES.DELETE_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onDelete}
        />
        <ResetCardModal
          open={showModalType === MODAL_TYPES.RESET_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onReset}
        />
        <div className="row">
          <div className="col-9 col-sm-10 d-flex flex-column flex-md-row">
            <span className="col-md-5 py-1">
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked(card.front) }}
                style={{ fontSize: "1em" }}
              />
            </span>
            <span className="d-none d-sm-block font-weight-bold col-md-7 mt-2 mt-md-0 py-1">
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked(card.back) }}
                style={{ fontSize: "1em" }}
              />
            </span>
          </div>
          <div className="col-3 col-sm-2 pl-0">
            <div className="d-flex justify-content-end align-items-center">
              {card.recallRate >= 0 && (
                <Popup
                  inverted
                  position="bottom right"
                  trigger={
                    <div>
                      <ProgressBar percent={card.recallRate} />
                    </div>
                  }
                >
                  Your recall strength of this card is approximately{" "}
                  {parseInt(card.recallRate * 100, 10)}%.
                </Popup>
              )}
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
                  {card.nextReviewDate && (
                    <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.RESET_ITEM}>
                      Reset Card
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.DELETE_ITEM}>
                    Delete Card
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

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(CardItem);
