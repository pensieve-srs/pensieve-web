import React, { Component } from "react";
import { Button, Checkbox, Segment, Header, Form, Input } from "semantic-ui-react";

class Notifications extends Component {
  state = { prefs: {} };
  onPrefToggle = () => console.log("onPrefToggle");

  editNotifs = () => console.log("editNotifs");

  render() {
    const { prefs } = this.state;

    return (
      <Segment padded>
        <Header>Notifications</Header>
        <Form>
          <Form.Field>
            <label>Email reminders</label>
            <Checkbox
              onClick={this.onPrefToggle}
              checked={prefs.emailNotifs}
              name="emailNotifs"
              label="Send me notifications when cards need to be reviewed"
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={this.editNotifs} primary>
              Update
            </Button>
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default Notifications;
