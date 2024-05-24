import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
  rememberPassword: false,
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error, user } = useSelector((state) => ({ ...state.auth }));
  const { email, password, rememberPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await dispatch(login({ formValue, navigate, toast }));

        if (response && response.status === "verified") {
          if (rememberPassword) {
            const storedPassword = {
              value: password,
              expiration: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
            };

            localStorage.setItem(
              "rememberedPassword",
              JSON.stringify(storedPassword)
            );
          } else {
            localStorage.removeItem("rememberedPassword");
          }
        }
      } catch (err) {
        console.error("Error during login:", err);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const currentYear = new Date().getFullYear();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedPasswordJSON = localStorage.getItem("rememberedPassword");

    if (storedPasswordJSON) {
      const storedPassword = JSON.parse(storedPasswordJSON);

      if (new Date().getTime() < storedPassword.expiration) {
        // Password is still valid
        setFormValue({
          ...formValue,
          password: storedPassword.value,
          rememberPassword: true,
        });
        setChecked(true);
      } else {
        // Password has expired
        localStorage.removeItem("rememberedPassword");
      }
    }
  }, []);
  return (
    <div className="flex full-height column">
      <div className="login">
        <div className="login-wrapper">
          <img src="/logo.png" alt="Tipster logo" />
          <h5 className="register margin-top">Uloguj se se</h5>
          <p>Dobro došli! Unesite vaše podatke za logovanje.</p>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Unesite vašu email adresu"
                contrast
              />
            </div>
            <div className="col-md-12" style={{ position: "relative" }}>
              <MDBInput
                id="formWhite"
                label="Šifra"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Unesite vašu šifru"
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
            </div>
            <div className="col-md-12">
              <MDBCheckbox
                id="rememberPassword"
                label="Zapamti šifru"
                checked={rememberPassword}
                onChange={() =>
                  onInputChange({
                    target: {
                      name: "rememberPassword",
                      value: !rememberPassword,
                      type: "checkbox",
                    },
                  })
                }
              />
            </div>
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <MDBCardFooter>
            <Link to="/register">
              <p className="text-center">
                Ukoliko nemate nalog, registrujte se!
              </p>
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

export default Login;
