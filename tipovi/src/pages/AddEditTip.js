import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBCardTitle,
} from "mdb-react-ui-kit";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTip, updateTip } from "../redux/features/tipSlice";

const initialState = {
  title: "",
  description: "",
  league: "",
  sport: "",
  country: "",
  rivales: "",
  tipsAndQuotes: "",
  tipDate: "",
};

const AddEditTip = () => {
  const [tipData, setTipData] = useState(initialState);
  const { error, userTips, tips } = useSelector((state) => ({
    ...state.tip,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    title,
    description,
    league,
    sport,
    country,
    rival1,
    rival2,
    scoreRival1,
    scoreRival2,
    tipsAndQuotes,
    tipDate,
    tipsAndQuotesLink,
  } = tipData;
  const { id } = useParams();

  useEffect(() => {
    if (id && tips.length > 0) {
      const singleTip = tips.find((tip) => tip._id === id);
      console.log("Podaci sa servera:", singleTip);
      if (singleTip) {
        setTipData({
          title: singleTip.title || "",
          description: singleTip.description || "",
          league: singleTip.league || "",
          sport: singleTip.sport || "",
          country: singleTip.country || "",
          rival1: singleTip.rival1 || "",
          rival2: singleTip.rival2 || "",
          scoreRival1: singleTip.scoreRival1 || "",
          scoreRival2: singleTip.scoreRival2 || "",
          tipsAndQuotes: singleTip.tipsAndQuotes || "",
          tipsAndQuotesLink: singleTip.tipDate || "",
          tipDate: singleTip.tipDate || "",
        });
      }
    }
  }, [id, userTips]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title &&
      description &&
      league &&
      sport &&
      country &&
      rival1 &&
      rival2 &&
      tipsAndQuotes &&
      tipsAndQuotesLink &&
      tipDate
    ) {
      const updatedTipData = { ...tipData, name: user?.result?.name };
      console.log("Sending tip data:", updatedTipData);
      if (!id) {
        dispatch(createTip({ updatedTipData, navigate, toast }));
      } else {
        dispatch(updateTip({ id, updatedTipData, toast, navigate }));
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTipData({ ...tipData, [name]: value });
  };

  const handleClear = () => {
    setTipData({
      title: "",
      description: "",
      league: "",
      country: "",
      sport: "",
      rival1: "",
      rival2: "",
      scoreRival1: "",
      scoreRival2: "",
      tipsAndQuotes: "",
      tipsAndQuotesLink: "",
      tipDate: "",
    });
  };
  return (
    <div
      style={{
        margin: "auto",
        paddingBottom: "10rem",
        maxWidth: "40rem",
        alignContent: "center",
      }}
      className="container"
    >
      <MDBCardTitle className="big-title">
        {id ? "Ažuriraj Tip" : "Kreiraj Tip"}
      </MDBCardTitle>
      <MDBCard alignment="center">
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter League"
                type="text"
                value={league}
                name="league"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide league"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Country"
                type="text"
                value={country}
                name="country"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide country"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Sport"
                type="text"
                value={sport}
                name="sport"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide sport"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Rivales"
                type="text"
                value={rival1}
                name="rival1"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide rivales"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Rivales"
                type="text"
                value={rival2}
                name="rival2"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide rivales"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Score Rival 1 - Home"
                type="text"
                value={scoreRival1}
                name="scoreRival1"
                onChange={onInputChange}
                className="form-control"
                invalid
                rows={4}
                validation="Please provide score"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Score Rival 2"
                type="text"
                value={scoreRival2}
                name="scoreRival2"
                onChange={onInputChange}
                className="form-control"
                invalid
                rows={4}
                validation="Please provide score"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Tips and Quotes"
                type="text"
                value={tipsAndQuotes}
                name="tipsAndQuotes"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                rows={4}
                validation="Please provide tips and quotes"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Tips and Quotes Link"
                type="text"
                value={tipsAndQuotesLink}
                name="tipsAndQuotesLink"
                onChange={onInputChange}
                className="form-control"
                rows={4}
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                label="Enter Description of tip"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea={true}
                rows={4}
                validation="Please provide description"
                contrast
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                id="formWhite"
                type="date"
                value={tipDate}
                name="tipDate"
                onChange={onInputChange}
                className="form-control"
                required
                contrast
              />
            </div>

            <div className="col-12 flex">
              <MDBBtn
                className="me-1"
                style={{ width: "100%" }}
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
              <MDBBtn className="me-1" style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTip;
