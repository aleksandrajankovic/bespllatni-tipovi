import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTips, deleteTip } from "../redux/features/tipSlice";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { tips } = useSelector((state) => ({ ...state.tip }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTips());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tip ?")) {
      dispatch(deleteTip({ id, toast }));
    }
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <>
        <MDBRow className="mt-5">
          <MDBTypography
            style={{ color: "#fff" }}
            className="text-center mb-5 "
            tag="h2"
          >
            Welcome, {user?.result?.name}
          </MDBTypography>
        </MDBRow>

        {tips.length === 0 ? (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tips Found
          </MDBTypography>
        ) : (
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-lg-3 g-2 g-lg-3">
              {tips.map((item, index) => (
                <div key={index}>
                  <MDBCard
                    alignment="center"
                    style={{ background: "#1c2f38", padding: "5px" }}
                  >
                    <MDBCardHeader
                      style={{ borderBottom: "2px solid #2E5465" }}
                    >
                      <div className="buttonWrapper">
                        <Link to={`/editTip/${item._id}`}>
                          <MDBCardTitle>
                            <MDBIcon className="greenLabel" far icon="edit" />
                          </MDBCardTitle>
                        </Link>
                        <MDBBtn
                          tag="a"
                          color="none"
                          onClick={() => handleDelete(item._id)}
                        >
                          <MDBCardTitle>
                            <MDBIcon
                              className="redLabel"
                              far
                              icon="trash-alt"
                            />
                          </MDBCardTitle>
                        </MDBBtn>
                      </div>
                      <h3 style={{ color: "#fff" }}>{item.title}</h3>
                      <span>
                        <p
                          className="text-center tipName"
                          style={{
                            color: " #5e90a7",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.sport}
                        </p>
                      </span>
                    </MDBCardHeader>

                    <MDBCardBody>
                      <MDBCardText style={{ color: "#BDBDBD" }}>
                        {item.description}
                      </MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter
                      style={{
                        color: "#BDBDBD",
                        borderTop: "2px solid #2E5465",
                      }}
                    >{`Tip date: ${moment(item.tipDate).format(
                      "DD.MM.YYYY"
                    )}`}</MDBCardFooter>
                  </MDBCard>
                </div>
              ))}
            </MDBRow>
          </MDBContainer>
        )}
      </>
    </div>
  );
};

export default Dashboard;
