import React, { Component } from "react";
import cx from "classnames";
import cookie from "js-cookie";
import debounce from "debounce";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";

import withErrors from "../../helpers/withErrors";
import isAuthenticated from "../../helpers/isAuthenticated";

import * as api from "./authActions";

import { logSignupEvent } from "../../helpers/GoogleAnalytics";
import FieldError from "./FieldError";

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
      invite: undefined,
      form: undefined,
    },
  };

  componentWillMount() {
    const { location } = this.props;
    const params = queryString.parse(location.search);
    if (params.invite) {
      this.setState({ invite: params.invite });
    }
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
    const { email, password, name, invite } = this.state;
    api.signupUser({ email, password, name, invite }).then(
      response => {
        logSignupEvent(response.data.user._id);
        cookie.set("token", response.headers.authorization);
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

  validateEmail = email => {
    const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !isValid ? "Please enter a valid email." : undefined;
  };

  validateName = name => {
    const isValid = name.length > 0;
    return !isValid ? "Please provide your first and last name." : undefined;
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
    const { name, email, invite, errors } = this.state;
    return (
      <div className="signup-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <h1 className="h4 mb-3 text-center">Create an account</h1>
              <Form>
                <div className="border rounded p-3 mb-3">
                  <Form.Field>
                    <label style={{ fontWeight: "bold", fontSize: "1.2em" }}>Invite phrase</label>
                    <Input
                      value={invite}
                      placeholder={`eg. ethanol mongeese guiro`}
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
                  <label>Full name</label>
                  <input
                    value={name}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="What should we call you?"
                    className={cx({ "border-danger": errors.name })}
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
