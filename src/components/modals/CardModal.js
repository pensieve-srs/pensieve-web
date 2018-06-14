import React, { Component } from "react";
import marked from "marked";
import { Dropdown, Divider, Label, Modal, Popup, Icon, Button } from "semantic-ui-react";

import { DeleteCardModal, EditCardModal, ResetCardModal, MODAL_TYPES } from "./index";

import ProgressBar from "../ProgressBar";

class CardModal extends Component {
  state = { card: this.props.card, showModalType: undefined };

  componentWillUpdate(nextProps) {
    if (this.props.card !== nextProps.card) {
      this.setState({ card: nextProps.card });
    }
  }
  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  onEdit = card => {
    this.props.onEdit(card);
    this.onCloseModal();
  };

  onReset = () => {
    this.props.onReset(this.state.card._id);
    this.onCloseModal();
  };

  onDelete = () => {
    this.props.onDelete(this.state.card._id);
    this.onCloseModal();
  };

  render() {
    const { open, deck, onClose, onPrev, onNext } = this.props;
    const { card, showModalType } = this.state;

    return (
      <Modal size="tiny" open={open} onClose={onClose} className="position-relative">
        <DeleteCardModal
          open={showModalType === MODAL_TYPES.DELETE_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onDelete}
        />
        <EditCardModal
          card={card}
          open={showModalType === MODAL_TYPES.EDIT_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onEdit}
        />
        <ResetCardModal
          open={showModalType === MODAL_TYPES.RESET_ITEM}
          onClose={this.onCloseModal}
          onSubmit={this.onReset}
        />
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <span>Card</span>
          <Dropdown
            on="click"
            icon={false}
            pointing="top right"
            trigger={<Icon name="ellipsis vertical" className="text-secondary mx-2" />}
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onShowModal} value={MODAL_TYPES.EDIT_ITEM}>
                Edit Card
              </Dropdown.Item>
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
        </Modal.Header>
        <Modal.Content>
          <div className="clearfix">
            {deck && <Label className="float-left">{deck.title}</Label>}
            {card.recallRate >= 0 && (
              <Popup
                inverted
                position="bottom right"
                trigger={
                  <div className="card-strength float-right d-flex align-items-center py-1">
                    <strong
                      style={{ lineHeight: "1em", fontWeight: 600 }}
                      className="text-secondary mr-2"
                    >
                      Recall Strength
                    </strong>
                    <ProgressBar percent={card.recallRate} />
                  </div>
                }
              >
                Your recall strength of this card is approximately{" "}
                {parseInt(card.recallRate * 100, 10)}%.
              </Popup>
            )}
          </div>
          <div className="clearfix">
            <div className="px-3 py-5">
              <span
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked(card.front) }}
                style={{ fontSize: "1em" }}
              />
            </div>
            <Label className="float-right" basic>
              Front
            </Label>
          </div>
          <Divider />
          <div className="clearfix">
            <div className="px-3 py-5">
              <span
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked(card.back) }}
                style={{ fontSize: "1em" }}
              />
            </div>
            <Label className="float-right" basic>
              Back
            </Label>
          </div>
          {card.notes && (
            <div>
              <Divider />
              <div className="clearfix">
                <div className="px-3">
                  <span>{card.notes}</span>
                </div>
                <Label className="float-right" basic>
                  Notes
                </Label>
              </div>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onPrev} icon labelPosition="left">
            Previous <Icon name="left chevron" />
          </Button>
          <Button onClick={onNext} icon labelPosition="right">
            Next <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CardModal;
