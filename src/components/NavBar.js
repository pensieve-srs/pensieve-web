import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import cx from "classnames";
import { withRouter } from "react-router";
import { Image, Dropdown } from "semantic-ui-react";
import gravatar from "gravatar";

import Octicon from "./Octicon";
import isAuthenticated from "../helpers/isAuthenticated";

import "./NavBar.css";

class NavBar extends Component {
  render() {
    const { className } = this.props;
    const authenticated = isAuthenticated();
    const user = cookie.get("user");

    const email = user ? JSON.parse(user).email : "";

    const isLandingPage = this.props.location.pathname === "/";

    return (
      <nav
        className={cx(className, "navbar navbar-expand-sm navbar-dark", {
          "navbar-landing": isLandingPage,
        })}
      >
        <div className="container">
          <Link className="navbar-brand" to={!authenticated ? "/" : "/decks"}>
            Pensieve
          </Link>

          {authenticated ? (
            <ul className="navbar-nav ml-auto flex-row">
              <li className="nav-item d-flex align-items-center mr-2">
                <Link
                  to="/decks/new"
                  className="d-flex nav-link text-big text-light"
                  style={{ fontSize: "20px" }}
                >
                  <Octicon name="plus" />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Dropdown
                  pointing="top right"
                  direction="left"
                  trigger={
                    <Image
                      style={{ height: "36px", width: "36px", margin: "0" }}
                      src={gravatar.url(email, { d: "retro" })}
                      avatar
                    />
                  }
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/settings" className="text-secondary text-uppercase">
                        My Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/logout" className="text-secondary text-uppercase">
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={this.onCollapse}>
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
