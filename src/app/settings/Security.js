import React, { Component } from "react";
import { Button, Segment, Form, Header, Input, Divider, Message } from "semantic-ui-react";

import * as api from "./userActions";

class Security extends Component {
  state = { error: false };
  updatePassword = event => {
    this.setState({ error: false, success: false });
    const newPassword = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      return this.setState({ error: "The password confirmation does not match" });
    }

    api
      .updatePassword({
        currentPassword: event.target.currentPassword.value,
        newPassword: event.target.newPassword.value,
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({ success: true });
      });
  };

  render() {
    return (
      <Segment padded>
        <Form onSubmit={this.updatePassword} error={this.state.error} success={this.state.success}>
          <Header>
            <Header.Content>Security</Header.Content>
            <Header.Subheader>Change security matters for your account.</Header.Subheader>
          </Header>
          <Divider />
          <Message error header="Invalid Password" content={this.state.error} />
          <Message success header="Password Updated" />
          <Header>Password change</Header>
          <Form.Field>
            <label>Current password</label>
            <Input
              type="password"
              onChange={this.onChange}
              name="currentPassword"
              placeholder="Enter your current password"
            />
          </Form.Field>
          <Form.Field>
            <label>New password</label>
            <Input
              type="password"
              onChange={this.onChange}
              name="newPassword"
              placeholder="Enter a new password"
            />
          </Form.Field>
          <Form.Field>
            <label>Confirmation</label>
            <Input
              type="password"
              onChange={this.onChange}
              name="confirmPassword"
              placeholder="Retype the new password"
            />
          </Form.Field>
          <Form.Field className="mt-4">
            <Button type="submit" basic primary>
              Change password
            </Button>
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default Security;
