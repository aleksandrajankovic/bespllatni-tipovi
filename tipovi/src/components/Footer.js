import React, { useEffect, useState } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#1c2f38" }}
    >
      <MDBContainer className="pt-4">
        <section className="mb-4">
          <MDBBtn
            rippleColor="dark"
            color="white"
            floating
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fab fa-facebook-f" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color="white"
            floating
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-twitter" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color="white"
            floating
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-google" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color="white"
            floating
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-instagram" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color="white"
            floating
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-linkedin" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color="white"
            floating
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-github" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className="text-center text-white p-3">
        © {currentYear} Copyright
        <a className="text-white" href="https://mdbootstrap.com/">
          | Besplatni tipovi
        </a>
      </div>
    </MDBFooter>
  );
}
