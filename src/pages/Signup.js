import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
//import './Login.css'
import './Signup.css'

const Signup = () => {
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
              <MDBInput label="Your email" group type="text" validate />
              <MDBInput
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
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
                  type="button"
                  className="btn-block z-depth-2"
                >
                  Sign up
                </MDBBtn>
              </div>
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
};

export default Signup;