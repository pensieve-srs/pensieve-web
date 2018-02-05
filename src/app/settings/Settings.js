import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

import Account from "./Account";
import Notifications from "./Notifications";
import Export from "./Export";

import withErrors from "../../helpers/withErrors";

// Page type enum
const PAGE = {
  ACCOUNT: "account",
  EXPORT: "export",
  NOTIFS: "notifications",
};

class Settings extends Component {
  state = { page: PAGE.ACCOUNT };

  componentWillMount() {
    const page = this.props.location.hash.substr(1);
    if (Object.values(PAGE).includes(page)) {
      this.setState({ page: page });
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.location !== nextProps.location) {
      const page = nextProps.location.hash.substr(1);
      if (Object.values(PAGE).includes(page)) {
        this.setState({ page: page });
      }
    }
  }

  render() {
    const { page } = this.state;

    return (
      <div className="account-page mt-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 offset-lg-1 mr-5">
              <Menu vertical>
                <Menu.Item link href="#account">
                  Account profile
                </Menu.Item>
                <Menu.Item link href="#export">
                  Export data
                </Menu.Item>
                <Menu.Item link href="#notifications">
                  Notifications
                </Menu.Item>
              </Menu>
            </div>
            <div className="col-lg-7">
              {
                {
                  [PAGE.ACCOUNT]: <Account {...this.props} />,
                  [PAGE.EXPORT]: <Export {...this.props} />,
                  [PAGE.NOTIFS]: <Notifications {...this.props} />,
                }[page]
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withErrors(Settings);
