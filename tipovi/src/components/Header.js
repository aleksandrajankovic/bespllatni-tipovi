import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth })); // postavljam usera da bude dostupan u hed komponenti

  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <MDBNavbar
      className="sticky-top"
      id="header"
      expand="lg"
      light
      bgColor="light"
    >
      <MDBContainer className="header-wrapper" fluid>
        <MDBNavbarBrand href="/">
          <img src="/logo.png" alt="Besplatni tipovi" />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <div className="flex">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="/">
                  <p className="header-text">Home</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              {user?.result?.role === "admin" && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/addTips">
                      <p className="header-text">Add tip</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/dashboard">
                      <p className="header-text">Dashboard</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
            </div>
            <div className="flex">
              {user?.result?._id ? (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="#" className="header-text">
                      <p className="header-text">Hello, {user?.result?.name}</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/login" className="header-text logout">
                      <p className="header-text" onClick={() => handleLogout()}>
                        Logout
                      </p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              ) : (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login" className="header-text">
                    Login
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )}
            </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
