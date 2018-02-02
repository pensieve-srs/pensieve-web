import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import cx from "classnames";
import { withRouter } from "react-router";

class NavBar extends Component {
  state = { isCollapsed: false };

  onCollapse = () => this.setState(({ isCollapsed }) => ({ isCollapsed: !isCollapsed }));

  render() {
    const { className } = this.props;
    const { isCollapsed } = this.state;
    const authenticated = Boolean(cookie.get("token"));

    const isLandingPage = this.props.location.pathname === "/";

    return (
      <nav
        className={cx(className, "navbar navbar-expand-sm navbar-dark")}
        style={{ zIndex: "2000", backgroundColor: isLandingPage ? "#1574fb" : "#262E45" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
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
            {authenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/decks" className="nav-link" onClick={this.onCollapse}>
                    Decks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/account" className="nav-link" onClick={this.onCollapse}>
                    Settings
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

export default withRouter(NavBar);
