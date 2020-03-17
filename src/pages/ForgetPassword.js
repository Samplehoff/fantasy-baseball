import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import './Login.css'

const initialState = {
  email: ''
}

class ForgetPassword extends Component {
  state = initialState;

  // make request to backend to reset user's password
  forgetPassword = e => {
    e.preventDefault();
    fetch('/api/users/forget-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(() => {
        //this.setState(initialState, () => window.location.href = '/');
      })
      .catch(err => console.log('err creating user', err));
  }

  handleInputChange = e => this.setState({ [e.target.id]: e.target.value })

  render() {
    const { email, password } = this.state;
    return (
      <div className="background">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Reset Password
                  </h3>
                  </MDBRow>
                </div>
                <MDBCardBody className="mx-4 mt-4">
                  <form onSubmit={this.forgetPassword}>
                    <MDBInput id="email" value={email} onChange={this.handleInputChange} label="Your email" group type="text" validate />
                    <div className="text-center mb-4 mt-5">
                      <MDBBtn
                        color="danger"
                        type="submit"
                        className="btn-block z-depth-2"
                      >
                        Submit
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

export default ForgetPassword;