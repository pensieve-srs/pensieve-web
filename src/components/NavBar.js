import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import cx from "classnames";

class NavBar extends Component {
  state = { isCollapsed: false };

  onCollapse = () => this.setState(({ isCollapsed }) => ({ isCollapsed: !isCollapsed }));

  render() {
    const { className } = this.props;
    const { isCollapsed } = this.state;
    const authenticated = Boolean(cookie.get("token"));

    return (
      <nav
        className={cx(className, "navbar navbar-expand-lg navbar-light")}
        style={{ background: "#fff", boxShadow: "0 1px 2px rgba(178, 178, 178, 0.5)" }}
      >
        <div className="container">
          <Link className="navbar-brand text-primary" to="/">
            Pensieve
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={this.onCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={cx("navbar-collapse", { collapse: !isCollapsed })}>
            {authenticated && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/study" className="nav-link" onClick={this.onCollapse}>
                    Study
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/decks" className="nav-link" onClick={this.onCollapse}>
                    Decks
                  </Link>
                </li>
              </ul>
            )}
            {authenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/account" className="nav-link" onClick={this.onCollapse}>
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link" onClick={this.onCollapse}>
                    Logout
                  </Link>
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
        </div>
      </nav>
    );
  }
}

export default NavBar;
