import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const loginBtnStyle = {backgroundColor:"#ec2840", border: 'none', borderRadius: '2em', padding:'0.3em 2em', fontSize:'1.2em', boxShadow: '0 0 0 0.2rem rgb(236 40 64 / 25%)'};
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const handleLogin = () => {
    history.push('/login');
  }

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          password: "",
          photo: "",
          error: "",
          success: false,
        };
        setLoggedInUser(signedOutUser);
      })
      .catch((err) => {});
  };

  return (
    <nav style={{ margin: "0em 10vw" }}>
      <Navbar expand="lg">
        <Navbar.Brand>
          <Link className="nav-text-logo" to="/home">
            {" "}
            TRIP MASTER
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mt-1">
            <Link className="nav-link nav-link-custom ml-3 mr-3" to="/home">
              HOME
            </Link>
            <Link
              className="nav-link nav-link-custom ml-3 mr-3"
              to="/destination/0"
            >
              DESTINATION
            </Link>
            <Link className="nav-link nav-link-custom ml-3 mr-3" to="/blog">
              BLOG
            </Link>
            <Link className="nav-link nav-link-custom ml-3 mr-3" to="/contact">
              CONTACT
            </Link>
            { loggedInUser.isSignedIn && <p style={{margin: '0'}} className="nav-name nav-link ml-3 mr-3">{loggedInUser.name}</p> }
            {
              <Button onClick={loggedInUser.isSignedIn ? handleSignOut : handleLogin} style={loginBtnStyle} className='ml-3 mr-3'>{loggedInUser.isSignedIn ? 'Logout' : 'Login'}</Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default Header;
