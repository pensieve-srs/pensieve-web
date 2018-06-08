import React, { Component } from "react";
import gravatar from "gravatar";
import { Button, Divider, Header, Form, Input, Image, Segment } from "semantic-ui-react";
import { DeleteUserModal, MODAL_TYPES } from "../../components/modals";

import * as api from "./userActions";

class Account extends Component {
  state = { user: { name: "", email: "", prefs: {} }, showModalType: undefined };

  componentWillMount = () => {
    this.fetchUser();
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  };

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  fetchUser = () => {
    api.fetchUser().then(({ data }) => {
      const { name, email, prefs } = data;
      this.setState({ user: { name, email, prefs } });
    });
  };

  editUser = () => {
    const { user } = this.state;
    api.editUser(user).then(({ data }) => {
      const { name, email, prefs } = data;
      this.setState({ user: { name, email, prefs } });
    });
  };

  deleteUser = () => {
    api.deleteUser().then(response => {
      this.props.history.push("/logout");
    });
  };

  render() {
    const { user, showModalType } = this.state;

    return (
      <div>
        <DeleteUserModal
          open={showModalType === MODAL_TYPES.DELETE_USER}
          onClose={this.onCloseModal}
          onSubmit={this.deleteUser}
        />
        <Segment padded>
          <Form>
            <Header>
              <Header.Content>Profile</Header.Content>
              <Header.Subheader>Update profile information for your account</Header.Subheader>
            </Header>
            <Divider />
            <Form.Field>
              <label>Profile picture</label>
              <div className="d-flex">
                <div>
                  <Image
                    className="rounded"
                    href={gravatar.url(user.email, { d: "retro", s: "200" }, true)}
                    src={gravatar.url(user.email, { d: "retro", s: "200" }, true)}
                    size="tiny"
                  />
                </div>
                <div className="d-flex flex-column justify-content-center ml-3">
                  <Header as="h6">
                    Profile pictures by Gravatar
                    <Header.Subheader>
                      You can update <a href="https://en.gravatar.com/">your image here</a>.
                    </Header.Subheader>
                  </Header>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <Input
                onChange={this.onChange}
                name="name"
                placeholder="Enter full name"
                value={user.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                onChange={this.onChange}
                name="email"
                placeholder="Enter email"
                value={user.email}
              />
            </Form.Field>
            <Form.Field className="mt-4">
              <Button onClick={this.editUser} primary>
                Update
              </Button>
            </Form.Field>
          </Form>
        </Segment>
        <Segment className="mt-5" color="red" padded>
          <Header>Delete your account</Header>
          <p>
            Do you wish to delete your account? This is permanent and all your data will be
            irreversibly erased.
          </p>
          <Button negative onClick={this.onShowModal} basic value={MODAL_TYPES.DELETE_USER}>
            Delete
          </Button>
        </Segment>
      </div>
    );
  }
}

export default Account;
