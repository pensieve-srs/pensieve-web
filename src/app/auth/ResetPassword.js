import React, { Component } from "react";
import cx from "classnames";
import debounce from "debounce";
import queryString from "query-string";
import { Button, Form, Message } from "semantic-ui-react";

import isAuthenticated from "../../helpers/isAuthenticated";

import * as api from "./authActions";
import FieldError from "./FieldError";

const errors = {
  400: "These credentials do not match our records.",
  500: "Something happened to your request. Please try again or contact us.",
};

class ResetPassword extends Component {
  state = {
    newPassword: "",
    verifyPassword: "",
    resetToken: "",
    errors: { newPassword: undefined, verifyPassword: undefined, form: undefined },
    isSuccess: false,
  };

  componentWillMount() {
    if (isAuthenticated()) {
      this.props.history.push("/");
    }
    const { token } = queryString.parse(this.props.location.search);
    if (token) {
      this.setState({ resetToken: token });
    }
  }

  onBlur = event => this.validateFields(event.target.name, event.target.value);

  onChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }), () => this.debounceValidateFields(name, value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { resetToken, newPassword, verifyPassword } = this.state;

    this.setState(
      {
        errors: {
          ...this.state.errors,
          newPassword: this.validatePassword(newPassword),
          verifyPassword: this.validatePassword(verifyPassword),
        },
      },
      () => this.resetPassword(resetToken, newPassword, verifyPassword),
    );
  };

  resetPassword = (token, newPassword, verifyPassword) => {
    const { errors } = this.state;
    if (!errors.newPassword && !errors.verifyPassword) {
      api.resetPassword({ token, newPassword, verifyPassword }).then(
        response => {
          this.setState({ isSuccess: true, errors: { ...this.state.errors, form: "" } });
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

  validatePassword = password => {
    const isValid = password.length >= 8;
    return !isValid
      ? "Short passwords are easy to guess. Try one with at least 8 characters."
      : undefined;
  };

  validatePasswordMatch = () => {
    const { newPassword, verifyPassword } = this.state;
    const isValid = newPassword === verifyPassword;
    return !isValid ? "Passwords do not match." : undefined;
  };

  debounceValidateFields = (name, value) => debounce(this.validateFields(name, value), 1000);

  validateFields = (fieldName, value) => {
    switch (fieldName) {
      case "verifyPassword":
        this.setState(({ errors }) => ({
          errors: {
            ...errors,
            verifyPassword: this.validatePassword(value) || this.validatePasswordMatch(),
          },
        }));
        break;
      case "newPassword":
        this.setState(({ errors }) => ({
          errors: { ...errors, newPassword: this.validatePassword(value) },
        }));
        break;
      default:
        break;
    }
  };

  render() {
    const { errors, isSuccess } = this.state;
    return (
      <div className="reset-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <h1 className="h4 mb-3 text-center">Reset Password</h1>
              <Form error={!!errors.form} success={isSuccess}>
                <Message success content="Thank you! Your password has been reset." />
                <Message error content={errors.form} />
                <Form.Field>
                  <input hidden type="email" autoComplete="username" />
                </Form.Field>
                <Form.Field>
                  <label>New Password</label>
                  <input
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Shh! Keep this a secret."
                    className={cx({ "border-danger": errors.newPassword })}
                    required
                  />
                  {errors.newPassword && <FieldError label={errors.newPassword} />}
                </Form.Field>
                <Form.Field>
                  <label>Confirm Password</label>
                  <input
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name="verifyPassword"
                    type="password"
                    autoComplete="verify-password"
                    placeholder="Re-enter your password above."
                    className={cx({ "border-danger": errors.verifyPassword })}
                    required
                  />
                  {errors.verifyPassword && <FieldError label={errors.verifyPassword} />}
                </Form.Field>
                <Button onClick={this.onSubmit} type="submit" primary fluid>
                  Update Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
