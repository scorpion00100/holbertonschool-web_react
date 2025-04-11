import React, {useContext} from "react";
import AppContext from "../App/AppContext";
import PropTypes from 'prop-types';

export default function Footer(props) {
    const value = useContext(AppContext);
    return (
      <>
        <p>{props.text}</p>
        {value.user.isLoggedIn ? (
          <p><a href="">Contact us</a></p>
        ) : null}
      </>
    );
}

Footer.propTypes = {
  text: PropTypes.string
};

Footer.defaultProps = {
  text: null
};
