import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function Nav() {
  const [, dispatch] = useStoreContext();

  const handleClick = () => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: ''
    });
  };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="nav_link">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="nav_link">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="nav_link">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav_link">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-nav px-1">
      <h1 onClick={() => {
        handleClick()
      }}>
        <Link to="/">
          <span role="img" aria-label="shopping bag">⌂</span>
        </Link>
      </h1>
      <nav>
        
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
