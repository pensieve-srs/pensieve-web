import React, { Component } from "react";
import { Checkbox, Message, Segment, Header, Form, Icon } from "semantic-ui-react";

const NOTIFS = {
  ALL: "all",
  DAILY: "daily",
  NEVER: "never",
};

class Notifications extends Component {
  state = { isOn: false, type: NOTIFS.DAILY };

  onEmailToggle = (event, data) => {
    this.setState({
      isOn: data.checked,
    });
  };

  onChangeFreq = value => {
    this.setState({
      type: value,
    });
  };

  render() {
    const { isOn, type } = this.state;

    return (
      <Segment padded>
        <Header>Notifications</Header>
        <Form>
          <Form.Field>
            <Checkbox
              onChange={this.onEmailToggle}
              checked={isOn}
              name="emailNotifs"
              label={
                <label>
                  <Header size="small">
                    Send me email notifications{" "}
                    <span className="text-secondary font-weight-normal ml-2">
                      {type === NOTIFS.DAILY ? "once every day" : "once every hour"}
                    </span>
                    <Header.Subheader>
                      <Icon color="blue" name="info circle" />Emails are only sent when cards need
                      to be reviewed
                    </Header.Subheader>
                  </Header>
                </label>
              }
            />
          </Form.Field>
          <Form.Field>
            <Message color={type === NOTIFS.DAILY ? "blue" : "grey"}>
              <Checkbox
                radio
                checked={type === NOTIFS.DAILY}
                disabled={!isOn}
                onChange={() => this.onChangeFreq(NOTIFS.DAILY)}
                label={
                  <label>
                    <Header size="small">
                      Daily notifications
                      <Header.Subheader>
                        You will be notified once a day. This is great for people that study once a
                        day and consolidate their reviews.
                      </Header.Subheader>
                    </Header>
                  </label>
                }
              />
            </Message>
            <Message color={type === NOTIFS.ALL ? "blue" : "grey"}>
              <Checkbox
                radio
                checked={type === NOTIFS.ALL}
                disabled={!isOn}
                onChange={() => this.onChangeFreq(NOTIFS.ALL)}
                label={
                  <label>
                    <Header size="small">
                      All notifications
                      <Header.Subheader>
                        You will be notified as soon as your cards need to be reviewed. This is good
                        for people that study throughout the day.
                      </Header.Subheader>
                    </Header>
                  </label>
                }
              />
            </Message>
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default Notifications;
