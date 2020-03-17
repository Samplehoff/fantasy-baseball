import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
//import './Login.css'
import './Signup.css'

const initialState = {
  username: '',
  password: '',
  email: ''
}

class Signup extends Component {
  state = initialState

  // make request to backend to create user account
  handleSubmit = e => {
    e.preventDefault();
    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
    .then(({username}) => {
      localStorage.setItem('username', username);
      this.setState(initialState, () => window.location.href = '/');
    })
    .catch(err => console.log('err creating user', err));
  }

  handleInputChange = e => this.setState({[e.target.id]: e.target.value})

  render() {
    const {username, email, password} = this.state;
    return (
      <div className="background">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Sign up
                  </h3>
                  </MDBRow>
                </div>
                <MDBCardBody className="mx-4 mt-4">
                  <form onSubmit={this.handleSubmit}>
                    <MDBInput value={username} id="username" label="Your username" onChange={this.handleInputChange} group type="text" validate />
                    <MDBInput value={email} id="email" label="Your email" onChange={this.handleInputChange} group type="text" validate />
                    <MDBInput
                    value={password}
                      id="password"
                      label="Your password"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                      onChange={this.handleInputChange}
                    />
                    <p className="font-small grey-text d-flex justify-content-end">
                      Forgot
                  <a
                        href="#!"
                        className="dark-grey-text font-weight-bold ml-1"
                      >
                        Password?
                  </a>
                    </p>
                    <div className="text-center mb-4 mt-5">
                      <MDBBtn
                        color="danger"
                        type="submit"
                        className="btn-block z-depth-2"
                      >
                        Sign up
                  </MDBBtn>
                    </div>
                  </form>
                  <p className="font-small grey-text d-flex justify-content-center">
                    Already Have an Account?
                  <a
                      href="/login"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Log In
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

export default Signup;