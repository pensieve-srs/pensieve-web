import React, { Component } from "react";
import { Divider, Label, Modal, Popup, Icon, Button } from "semantic-ui-react";

import ProgressBar from "../ProgressBar";

class CardModal extends Component {
  render() {
    const { open, card, deck, onClose, onPrev, onNext } = this.props;
    return (
      <Modal size="tiny" open={open} onClose={onClose} className="position-relative">
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <span>Card</span>
          <Icon floated="right" name="ellipsis vertical" />
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
                    <strong style={{ lineHeight: "1em" }} className="text-secondary mr-2">
                      Recall Strength
                    </strong>
                    <ProgressBar percent={card.recallRate} />
                  </div>
                }
              >
                You have a {card.recallRate * 100}% chance of remembering this card correctly
              </Popup>
            )}
          </div>
          <div className="clearfix">
            <div className="px-3 py-5">
              <span>{card.front}</span>
            </div>
            <Label className="float-right" basic>
              Front
            </Label>
          </div>
          <Divider />
          <div className="clearfix">
            <div className="px-3 py-5">
              <strong>{card.back}</strong>
            </div>
            <Label className="float-right" basic>
              Back
            </Label>
          </div>
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
