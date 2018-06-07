import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import cookie from "js-cookie";

import withErrors from "../../helpers/withErrors";

import * as api from "./authActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (cookie.get("token")) {
      this.props.history.push("/");
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    api.loginUser(email, password).then(
      response => {
        cookie.set("token", response.data.token);
        cookie.set("user", response.data.user);

        this.props.history.push("/decks");
      },
      error => {
        if (error.response && error.response.status === 400) {
          this.props.onError("Oops, it does not look like that is a valid username or password.");
        }
      },
    );
  }

  render() {
    return (
      <div className="login-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <h1 className="h4 mb-3 text-center">Login to your account</h1>
              <Form>
                <Form.Field>
                  <label>Email</label>
                  <input
                    onChange={this.onChange}
                    name="email"
                    type="email"
                    placeholder="you@your-domain.com"
                    autoComplete="username"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    onChange={this.onChange}
                    name="password"
                    type="password"
                    placeholder="Shh! Keep this a secret."
                    autoComplete="current-password"
                  />
                </Form.Field>
                <Button onClick={this.onSubmit} type="submit" primary fluid>
                  Login
                </Button>
              </Form>

              <hr />

              <p className="text-center mb-1">
                Forgot your password? <a href="mailto:hello@pensieve.space">Send us a message</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withErrors(Login);
