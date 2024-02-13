import React, { useState } from "react";
import Header from "./Header";
import {
  MDBFooter,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarBrand,
  MDBNavbar,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { useLocation } from "react-router-dom";
export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth })); // postavljam usera da bude dostupan u hed komponenti
  const location = useLocation();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <MDBFooter className="text-center p-5">
      <MDBNavbarBrand href="/">
        <img src="/logo.png" alt="Besplatni tipovi" />
      </MDBNavbarBrand>
      <MDBNavbar id="header" expand="lg" className="p-3">
        <MDBNavbarNav className="flex">
          <MDBNavbarItem>
            <MDBNavbarLink active aria-current="page" href="/">
              <p className="header-text">Početna</p>
            </MDBNavbarLink>
          </MDBNavbarItem>

          {user?.result?._id ? (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink href="/login" className="header-text logout">
                  <p className="header-text" onClick={() => handleLogout()}>
                    Izloguj se
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
          ) : (
            <MDBNavbarItem>
              <MDBNavbarLink href="/login" className="header-text">
                <p className="header-text">Uloguj se</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
          )}
        </MDBNavbarNav>
      </MDBNavbar>
      <div className="text-center copyright">
        © {currentYear} Sva prava zadržana
      </div>
    </MDBFooter>
  );
}
