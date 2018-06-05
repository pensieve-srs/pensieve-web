import React from "react";
import octicons from "octicons";
import cx from "classnames";

import "./Octicon.css";

const Octicon = ({ name, className, color, ...props }) => {
  if (name in octicons) {
    return (
      <span
        className={cx("Octicon", className, { [`Octicon-${color}`]: color })}
        dangerouslySetInnerHTML={{ __html: octicons[name].toSVG(props) }}
      />
    );
  } else {
    throw new Error(`No such octicon: ${name}!`);
  }
};
export default Octicon;
