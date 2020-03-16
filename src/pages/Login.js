import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import './Login.css'

const initialState = {
  username: '',
  password: ''
}

class Login extends Component {
  state = initialState;

  // make request to backend to verify user info
  loginUser = e => {
    e.preventDefault();
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(({ username }) => {
        localStorage.setItem('username', username);
        this.setState(initialState, () => window.location.href = '/');
      })
      .catch(err => console.log('err creating user', err));
  }

  handleInputChange = e => this.setState({ [e.target.id]: e.target.value })

  render() {
    const { username, password } = this.state;
    return (
      <div className="background">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Log in
                  </h3>
                  </MDBRow>
                </div>
                <MDBCardBody className="mx-4 mt-4">
                  <form onSubmit={this.loginUser}>
                    <MDBInput id="username" value={username} onChange={this.handleInputChange} label="Your username" group type="text" validate />
                    <MDBInput
                      id="password"
                      value={password}
                      onChange={this.handleInputChange}
                      label="Your password"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                    />
                    <p className="font-small grey-text d-flex justify-content-end">
                      Forgot
                  <Link
                        to="/forget-password"
                        className="dark-grey-text font-weight-bold ml-1"
                      >
                        Password?
                  </Link>
                    </p>
                    <div className="text-center mb-4 mt-5">
                      <MDBBtn
                        color="danger"
                        type="submit"
                        className="btn-block z-depth-2"
                      >
                        Log in
                  </MDBBtn>
                    </div>
                  </form>
                  <p className="font-small grey-text d-flex justify-content-center">
                    Don't have an account?
                  <a
                      href="/signup"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Sign up
                  </a>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Login;