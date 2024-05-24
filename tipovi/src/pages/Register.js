// Register.jsx

import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{12,}$/;
const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Please provide a valid email address");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Šifra mora da sadrži 12 karaktera, uključujući broj i veliko slovo"
      );
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

  const [fieldValidity, setFieldValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    const isValid = validateField(name, value);
    console.log("Name:", name, "Value:", value, "isValid:", isValid);
    setFormValue({ ...formValue, [name]: value });
    setFieldValidity({ ...fieldValidity, [name]: isValid });
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        console.log("Email validation:", emailRegex.test(value));
        return emailRegex.test(value);
      case "password":
        console.log("Password validation:", passwordRegex.test(value));
        return passwordRegex.test(value);
      default:
        return true;
    }
  };

  const [currentYear] = useState(new Date().getFullYear());
  return (
    <div className="flex full-height column">
      <div className="login">
        <div className="login-wrapper">
          <img src="/logo.png" alt="Tipster logo" />
          <h5 className="register margin-top">Registruj se</h5>
          <p>Dobro došli! Unesite vaše podatke za registraciju.</p>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Unesite vaše ime"
              invalid
            >
              <MDBInput
                id="firstName"
                label="Unesite ime"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required={true}
                validation="Ime je obavezno polje"
                contrast
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Unesite vaše prezime"
              invalid
            >
              <MDBInput
                id="lastName"
                label="Unesite prezime"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required={true}
                validation="Prezime je obavezno polje"
                contrast
              />
            </MDBValidationItem>
            <MDBValidationItem className="col-md-12">
              <MDBInput
                id="email"
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required={true}
                feedback={true}
                invalid={!fieldValidity.email}
                validation="Unesite ispravan email"
                contrast
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              style={{ position: "relative" }}
              feedback="Šifra mora da sadrži 12 karaktera, uključujući broj i veliko
                    slovo."
              invalid={!fieldValidity.password}
            >
              <MDBInput
                id="password"
                label="Unesite šifru"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={onInputChange}
                required={true}
                contrast
              />
              {password && (
                <MDBIcon
                  icon={showPassword ? "eye-slash" : "eye"}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "21px",
                    top: "9px",
                    color: "#fff",
                  }}
                />
              )}
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Potvrdite sifru"
              invalid={!fieldValidity.confirmPassword}
            >
              <MDBInput
                id="confirmPassword"
                label="Potvrdite šifru"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required={true}
                validation="Šifre se ne podudaraju"
                contrast
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Registruj se
              </MDBBtn>
            </div>
          </MDBValidation>
          <MDBCardFooter>
            <Link to="/login">
              <p className="text-center">Imate kreiran nalog ? Ulogujte se!</p>
            </Link>
          </MDBCardFooter>
        </div>
        <div className="flex-spaceB g-3">
          <div className="register-footer">
            <div className="register-copyright">
              <p>@Besplatni Tipovi {currentYear}</p>
            </div>
          </div>
          <div className="register-copyright">
            <MDBIcon far icon="envelope" />
            <p>help@tipster.com</p>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Register;
