import React, { Component, Fragment } from "react";
import cx from "classnames";
import { Button, Form } from "semantic-ui-react";

class BetaListForm extends Component {
  state = { email: "", showCTA: false };

  render() {
    const { inverted } = this.props;

    return (
      <Fragment>
        {!this.state.showCTA ? (
          <Button
            onClick={() => this.setState({ showCTA: true })}
            className={cx("btn-cta", { "btn-light": inverted })}
            size="large"
            primary={!inverted}
          >
            REQUEST EARLY ACCESS
          </Button>
        ) : (
          <Form
            action="https://space.us17.list-manage.com/subscribe/post?u=6ba21cd3bc4ade157639edfbd&amp;id=870fad835a"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            inverted={inverted}
            noValidate
          >
            <Form.Group>
              <Form.Input
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                value={this.state.email}
                name="EMAIL"
                className="email rounded-0"
                id="mce-EMAIL"
                label="Sign up for the beta with your email"
                placeholder="Email address"
                required
              />
              <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                <Form.Input
                  type="text"
                  name="b_6ba21cd3bc4ade157639edfbd_870fad835a"
                  tabIndex="-1"
                  value=""
                />
              </div>
              <div className="d-flex align-items-end ml-1">
                <Button
                  className={cx({ "btn-light": inverted })}
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  primary={!inverted}
                >
                  JOIN
                </Button>
              </div>
            </Form.Group>
          </Form>
        )}
      </Fragment>
    );
  }
}

export default BetaListForm;
