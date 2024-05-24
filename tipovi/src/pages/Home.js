import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTips } from "../redux/features/tipSlice";
import TipCard from "../components/TipCard";
import Spinner from "../components/Spinner";
import filterTips from "../utilis/filterTipovi";
import filterPretrage from "../utilis/FilterPretrage";

const Home = () => {
  const { tips, loading } = useSelector((state) => ({ ...state.tip }));
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState("Svi");
  const [searchTerm, setSearchTerm] = useState("");
  const [tipsToShow, setTipsToShow] = useState(6);

  useEffect(() => {
    dispatch(getTips(tipsToShow));
  }, [tipsToShow, dispatch]);

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLoadMore = () => {
    setTipsToShow((prevTips) => prevTips + 6);
  };

  let filteredTips = filterPretrage(tips, searchTerm);
  filteredTips = filterTips(filteredTips, currentFilter);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1200px",
        alignContent: "center",
      }}
    >
      <div className="mb-3 flex column">
        <MDBInput
          label="Pretraga"
          type="text"
          id="pretraga"
          value={searchTerm}
          icon="search"
          onChange={(e) => handleSearch(e.target.value)}
          contrast
        />
        <div className="flex">
          <MDBBtn
            color="light"
            rippleColor="dark"
            onClick={() => handleFilter("Svi")}
          >
            Svi
          </MDBBtn>
          <MDBBtn
            color="light"
            rippleColor="dark"
            onClick={() => handleFilter("Aktivni")}
          >
            Aktivni
          </MDBBtn>
          <MDBBtn
            color="light"
            rippleColor="dark"
            onClick={() => handleFilter("Istekli")}
          >
            Istekli
          </MDBBtn>
        </div>
      </div>
      <MDBContainer>
        <MDBRow className="mt-5">
          {filteredTips.length === 0 && (
            <MDBTypography className="text-center mb-0" tag="h2">
              Nema pronađenih tipova
            </MDBTypography>
          )}
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-3 g-3">
          {filteredTips &&
            filteredTips
              .sort(
                (tip1, tip2) =>
                  new Date(tip2.createdAt) - new Date(tip1.createdAt)
              )
              .slice(0, tipsToShow)
              .map((item, index) => (
                <div key={index}>
                  {" "}
                  <TipCard {...item} />{" "}
                </div>
              ))}
        </MDBRow>
        <div className="flex g-3">
          <MDBBtn color="light" rippleColor="dark" onClick={handleLoadMore}>
            Učitaj više
          </MDBBtn>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Home;
