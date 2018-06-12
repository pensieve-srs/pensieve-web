import React, { Component } from "react";
import cx from "classnames";
import { Button, Form, Message } from "semantic-ui-react";
import cookie from "js-cookie";
import debounce from "debounce";

import isAuthenticated from "../../helpers/isAuthenticated";

import * as api from "./authActions";
import FieldError from "./FieldError";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: { email: undefined, password: undefined, form: undefined },
  };

  componentWillMount() {
    if (isAuthenticated()) {
      this.props.history.push("/");
    }
  }

  onBlur = event => this.validateFields(event.target.name, event.target.value);

  onChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }), () => this.debounceValidateFeilds(name, value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    api.loginUser(email, password).then(
      response => {
        cookie.set("token", response.headers.authorization);
        cookie.set("user", response.data.user);

        this.props.history.push("/decks");
      },
      error => this.handleError(error),
    );
  };

  handleError = error => {
    const isInvalidUser = error.response && error.response.status === 400;
    const message = isInvalidUser ? "These credentials do not match our records." : undefined;
    this.setState({ errors: { ...this.state.errors, form: message } });
  };

  validateEmail = email => {
    const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !isValid ? "Please enter a valid email." : undefined;
  };

  validatePassword = password => {
    const isValid = password.length >= 8;
    return !isValid
      ? "Short passwords are easy to guess. Try one with at least 8 characters."
      : undefined;
  };

  debounceValidateFeilds = (name, value) => debounce(this.validateFields(name, value), 500);

  validateFields = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        this.setState(({ errors }) => ({
          errors: { ...errors, email: this.validateEmail(value) },
        }));
        break;
      case "password":
        this.setState(({ errors }) => ({
          errors: { ...errors, password: this.validatePassword(value) },
        }));
        break;
      default:
        break;
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <h1 className="h4 mb-3 text-center">Login to your account</h1>
              <Form error={!!errors.form}>
                <Form.Field>
                  <Message error content={errors.form} />
                  <label>Email</label>
                  <input
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="you@your-domain.com"
                    className={cx({ "border-danger": errors.email })}
                  />
                  {errors.email && <FieldError label={errors.email} />}
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Shh! Keep this a secret."
                    className={cx({ "border-danger": errors.password })}
                  />
                  {errors.password && <FieldError label={errors.password} />}
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

export default Login;
