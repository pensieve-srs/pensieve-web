import React, { Component } from "react";
import cx from "classnames";
import cookie from "js-cookie";
import debounce from "debounce";
import { Link } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";

import isAuthenticated from "../../helpers/isAuthenticated";

import * as api from "./authActions";
import * as GA from "../../helpers/GoogleAnalytics";

import FieldError from "./FieldError";

const errors = {
  409: "User already exists. Please login instead.",
  400: "Unable to create an account with these fields.",
  500: "Something happened to your request. Please try again or contact us.",
};

class Signup extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    invite: "",
    errors: {
      email: undefined,
      password: undefined,
      name: undefined,
      form: undefined,
    },
  };

  componentWillMount() {
    if (isAuthenticated()) {
      this.props.history.push("/");
    }
  }

  onBlur = event => this.validateFields(event.target.name, event.target.value);

  onChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }), () => this.state.errors[name] && this.debounceValidateFields(name, value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password, name } = this.state;

    this.setState(
      {
        errors: {
          ...this.state.errors,
          email: this.validateEmail(email),
          password: this.validatePassword(password),
          name: this.validateName(name),
        },
      },
      () => this.signupUser({ email, password, name }),
    );
  };

  signupUser = ({ email, password, name, invite }) => {
    const { errors } = this.state;
    if (!errors.email && !errors.password && !errors.name && !errors.invite) {
      api.signupUser({ email, password, name, invite }).then(
        response => {
          GA.logSignupEvent(response.data.user._id);
          cookie.set("token", response.headers.authorization);
          cookie.set("user", response.data.user);

          this.props.history.push("/decks");
        },
        error => this.handleError(error),
      );
    }
  };

  handleError = error => {
    const { response = {} } = error;
    const message = errors[response.status];
    this.setState({ errors: { ...this.state.errors, form: message } });
  };

  validateEmail = email => {
    const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !isValid ? "Please enter a valid email." : undefined;
  };

  validateName = name => {
    const isValid = name.length > 0;
    return !isValid ? "Please provide your first and last name." : undefined;
  };

  validatePassword = password => {
    const minLength = 8;
    const hasOneDigit = /(?=.*\d)/;
    const hasOneLetter = /(?=.*[a-zA-Z])/i;
    if (password.length < minLength) {
      return "Use at least 8 characters. Short passwords are easy to guess.";
    } else if (!hasOneDigit.test(password)) {
      return "Use at least 1 number in your password.";
    } else if (!hasOneLetter.test(password)) {
      return "Use at least 1 letter in your password.";
    } else {
      return;
    }
  };

  debounceValidateFields = (name, value) => debounce(this.validateFields(name, value), 1000);

  validateFields = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        this.setState(({ errors }) => ({
          errors: { ...errors, email: this.validateEmail(value) },
        }));
        break;
      case "name":
        this.setState(({ errors }) => ({
          errors: { ...errors, name: this.validateName(value) },
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
    const { name, email, errors } = this.state;
    return (
      <div className="signup-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <h1 className="h4 mb-3 text-center">Create an account</h1>
              <Form error={!!errors.form}>
                <Message error content={errors.form} />
                <Form.Field>
                  <label>Full name</label>
                  <input
                    value={name}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="What should we call you?"
                    className={cx({ "border-danger": errors.name })}
                    required
                  />
                  {errors.name && <FieldError label={errors.name} />}
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    value={email}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@your-domain.com"
                    className={cx({ "border-danger": errors.email })}
                    required
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
                  <small className="text-secondary" style={{ fontSize: "12px" }}>
                    Use at least one letter, one numeral, and eight characters.
                  </small>
                  {errors.password && <FieldError label={errors.password} />}
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

export default Signup;
