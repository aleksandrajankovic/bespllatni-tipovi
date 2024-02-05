import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import AddEditTip from "./pages/AddEditTip";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import VerifyComponent from "./components/VerifyComponent";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
} from "mdb-react-ui-kit";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  const isLoginPage = window.location.pathname === "/login";
  const isRegisterPage = window.location.pathname === "/register";

  const showHeaderAndFooter = !isLoginPage && !isRegisterPage;
  return (
    <BrowserRouter>
      <Helmet>
        <title>Besplatni Tipovi</title>
      </Helmet>
      {showHeaderAndFooter && <Header />}
      <ToastContainer position="top-right" />
      <Container fluid>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addTips" element={<AddEditTip />} />
              <Route path="/editTip/:id" element={<AddEditTip />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/verify/:token" element={<VerifyComponent />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      {showHeaderAndFooter && <Footer />}
    </BrowserRouter>
  );
}

export default App;
