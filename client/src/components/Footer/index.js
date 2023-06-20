import React from "react";
import { Link } from "react-router-dom";
import { UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useStoreContext } from "../../utils/GlobalState";

function Footer() {
    const [, dispatch] = useStoreContext();

    const handleClick = () => {
      dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: ''
      });
    };
    return (
        <footer>
            <li onClick={() => {
                handleClick()
            }}>
                <Link to="/">
                    Home
                </Link>
            </li>
            <li>
            <a className="footer-link" href='https://github.com/chazgraham'>@Chaz Graham Express-shop</a>
            </li>
        </footer>
    )
}

export default Footer;