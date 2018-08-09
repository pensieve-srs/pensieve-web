import React from "react";
import { Menu, Icon } from "semantic-ui-react";

import Account from "./Account";
import Notifications from "./Notifications";
import Security from "./Security";

import withErrors from "../../helpers/withErrors";

// Page type enum
const PAGE = {
  ACCOUNT: "account",
  NOTIFS: "notifications",
  SECURITY: "security",
};

const Settings = props => {
  let page = props.location.hash.substr(1);
  if (!Object.values(PAGE).includes(page)) {
    page = PAGE.ACCOUNT; // default
  }
  return (
    <div className="account-page mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-lg-2 offset-lg-1">
            <Menu vertical className="w-100 mb-3">
              <Menu.Item active={page === PAGE.ACCOUNT} link href="#account">
                <Icon name="settings" />Account profile
              </Menu.Item>
              <Menu.Item active={page === PAGE.SECURITY} link href="#security">
                <Icon name="setting" />
                Security
              </Menu.Item>
            </Menu>
          </div>
          <div className="col-md-9 col-lg-6">
            {
              {
                [PAGE.ACCOUNT]: <Account {...props} />,
                [PAGE.NOTIFS]: <Notifications {...props} />,
                [PAGE.SECURITY]: <Security {...props} />
              }[page]
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrors(Settings);
