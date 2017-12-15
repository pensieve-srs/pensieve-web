import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import cookie from "js-cookie";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "", name: "" };
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
    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password, name } = this.state;
    axios.post("/users/signup", { email, password, name }).then(
      response => {
        cookie.set("token", response.data.token);
        cookie.set("user", response.data.user);

        this.props.history.push("/decks");
      },
      error => {
        console.log("error", error);
      },
    );
  }

  render() {
    return (
      <div className="signup-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h1 className="h4 mb-3 text-center">Create an account</h1>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input
                    onChange={this.onChange}
                    name="name"
                    type="text"
                    placeholder="What should we call you?"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    onChange={this.onChange}
                    name="email"
                    type="email"
                    placeholder="you@your-domain.com"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    onChange={this.onChange}
                    name="password"
                    type="password"
                    placeholder="Shh! Keep this a secret."
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

export default Signup;
