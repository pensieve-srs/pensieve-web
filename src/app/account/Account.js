import React, { Component } from "react";
import { Button, Header, Form, Input, Segment } from "semantic-ui-react";

import * as api from "./userActions";

import { DeleteUserModal, MODAL_TYPES } from "../../components/modals";

class Account extends Component {
  state = { user: { name: "", email: "" }, showModalType: undefined };

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
    api.fetchUser().then(
      response => {
        const { name, email } = response.data;
        this.setState({ user: { name, email } });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  editUser = () => {
    const { user } = this.state;
    api.editUser(user).then(
      response => {
        const { name, email } = response.data;
        this.setState({ user: { name, email } });
      },
      error => {
        console.log("error", error);
      },
    );
  };

  deleteUser = () => {
    api.deleteUser().then(
      response => {
        this.props.history.push("/logout");
      },
      error => {
        console.log("error", error);
      },
    );
  };

  render() {
    const { user: { name, email }, showModalType } = this.state;
    return (
      <div className="account-page">
        <DeleteUserModal
          open={showModalType === MODAL_TYPES.DELETE_USER}
          onClose={this.onCloseModal}
          onSubmit={this.deleteUser}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <Header as="h4">Profile</Header>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <Input
                    onChange={this.onChange}
                    name="name"
                    placeholder="Full name"
                    value={name}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <Input
                    onChange={this.onChange}
                    name="email"
                    placeholder="Enter email"
                    value={email}
                  />
                </Form.Field>
                <Form.Field>
                  <Button onClick={this.editUser} primary>
                    Update
                  </Button>
                </Form.Field>
              </Form>
              <Segment className="mt-5" color="red">
                <Header as="h5">Delete your account</Header>
                <p>
                  Do you wish to delete your account? This is permament and all your data will be
                  permanently erased?
                </p>
                <Button negative onClick={this.onShowModal} value={MODAL_TYPES.DELETE_USER}>
                  Delete
                </Button>
              </Segment>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
