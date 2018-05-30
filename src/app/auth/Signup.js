import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import cookie from "js-cookie";
import niceware from "niceware";

import withErrors from "../../helpers/withErrors";

import * as api from "./authActions";

import { logSignupEvent } from "../../helpers/GoogleAnalytics";

const passLabel = niceware.generatePassphrase(6).join(" ");

class Signup extends Component {
  state = { email: "", password: "", name: "" };

  componentWillMount() {
    if (cookie.get("token")) {
      this.props.history.push("/");
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const { email, password, name, invite } = this.state;
    api.signupUser({ email, password, name, invite }).then(
      response => {
        logSignupEvent(response.data.user._id);
        cookie.set("token", response.data.token);
        cookie.set("user", response.data.user);

        this.props.history.push("/decks");
      },
      error => {
        if (error.response.status === 400) {
          this.props.onError("Oops, it does not look like that is a valid sign up");
        }
      },
    );
  };

  render() {
    return (
      <div className="signup-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h1 className="h4 mb-3 text-center">Create an account</h1>
              <Form>
                <div className="border rounded p-3 mb-3">
                  <Form.Field>
                    <label style={{ fontWeight: "bold", fontSize: "1.2em" }}>Invite phrase</label>
                    <Input
                      placeholder={`eg. ${passLabel}`}
                      onChange={this.onChange}
                      name="invite"
                      type="text"
                      size="large"
                      autoFocus
                      focus
                    />
                    <small className="text-secondary">
                      An invite code is required to join. Get an invite by signing up for early
                      access.
                    </small>
                  </Form.Field>
                </div>
                <Form.Field>
                  <label>Name</label>
                  <Input
                    onChange={this.onChange}
                    name="name"
                    type="text"
                    required
                    placeholder="What should we call you?"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <Input
                    onChange={this.onChange}
                    name="email"
                    type="email"
                    placeholder="you@your-domain.com"
                    autoComplete="username"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    onChange={this.onChange}
                    name="password"
                    type="password"
                    placeholder="Shh! Keep this a secret."
                    autoComplete="current-password"
                  />
                </Form.Field>
                <Button className="mt-4" onClick={this.onSubmit} type="submit" primary fluid>
                  Join
                </Button>
              </Form>

              <hr />

              <p className="text-center mb-1">
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <p className="text-center mb-3">
                Or go <Link to="/">home</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withErrors(Signup);
