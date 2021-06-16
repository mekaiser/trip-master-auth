import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import firebaseConfig from "./firebase.config";
import "./Login.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);

  // ================ Google Sign In ================
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const user = result.user;
        const { displayName, email } = user;
        const newUserInfo = { ...loggedInUser };
        newUserInfo.name = displayName;
        newUserInfo.email = email;
        newUserInfo.isSignedIn = true;
        newUserInfo.success = true;
        setLoggedInUser(newUserInfo);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // ================ Validate Email & Password  ================
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...loggedInUser };
      newUserInfo[e.target.name] = e.target.value;
      setLoggedInUser(newUserInfo);
    }
  };

  // ================ Sign Up For New User & Log In For Old User  ================
  const handleSubmit = (e) => {
    if (newUser && loggedInUser.email && loggedInUser.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          loggedInUser.email,
          loggedInUser.password
        )
        .then((userCredential) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = "";
          newUserInfo.success = true;
          newUserInfo.isSignedIn = true;
          setLoggedInUser(newUserInfo);
          updateUserName(loggedInUser.name);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setLoggedInUser(newUserInfo);
        });
    }

    if (!newUser && loggedInUser.email && loggedInUser.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((userCredential) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = "";
          newUserInfo.name = userCredential.user.displayName;
          newUserInfo.success = true;
          newUserInfo.isSignedIn = true;
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...loggedInUser };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setLoggedInUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  // ================ Firebase Username Update ================
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="body-image">
      <Header></Header>
      {loggedInUser.isSignedIn ? (
        <h1 style={{ textAlign: "center", marginTop: "4rem", color: "tomato" }}>
          You are already logged in buddy!
        </h1>
      ) : (
        <div className="login-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                onClick={() => setNewUser(!newUser)}
                className="text-white"
                type="checkbox"
                label="Don't have an account?"
              />
            </Form.Group>
            {newUser && (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  onBlur={handleBlur}
                  className="login-form-input"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your name with anyone else.
                </Form.Text>
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                onBlur={handleBlur}
                className="login-form-input"
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                onBlur={handleBlur}
                className="login-form-input"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <Form.Text className="text-muted">
                Password must be of 6 character and must contain a number.
              </Form.Text>
            </Form.Group>

            <Button
              className="login-btn"
              style={{
                backgroundColor: "#ec2840",
                border: "none",
                borderRadius: "2em",
                padding: "0.5em 2em",
                fontSize: "1.2em",
              }}
              type="submit"
            >
              {newUser ? "Sign Up" : "Login"}
            </Button>
          </Form>

          <p
            style={{ textAlign: "center", marginTop: "1.5em" }}
            className="text-white"
          >
            --------------OR--------------
          </p>

          <div className="text-align-center mt-4 d-flex justify-content-center">
            <Button
              className="login-btn"
              style={{
                backgroundColor: "#ec2840",
                border: "none",
                borderRadius: "2em",
                marginTop: "1.5em",
                padding: "0.5em 2em",
                fontSize: "1.2em",
              }}
              onClick={handleGoogleSignIn}
              type="submit"
            >
              Continue With Google
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
