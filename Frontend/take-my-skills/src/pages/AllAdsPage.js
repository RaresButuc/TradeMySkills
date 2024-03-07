import axios from "axios";
import { useState, useEffect } from "react";

import Ads from "../components/Ads";
import Filter from "../components/Filter";
import ErrorPage from "../pages/ErrorPage";
import Category from "../components/Category";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function AllOffer() {
  const navigate = useNavigate();

  const [allAds, setAds] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(null);
  const [paginationDetails, setPaginationDetails] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const categoryParam = new URLSearchParams(window.location.search).get(
          "category"
        );
        const sortParam = new URLSearchParams(window.location.search).get(
          "sort"
        );
        const inputParam = new URLSearchParams(window.location.search).get(
          "input"
        );
        const pageNumberParam = new URLSearchParams(window.location.search).get(
          "pagenumber"
        );

        const response = await axios.get(
          `http://localhost:8080/ads?category=${categoryParam}&sort=${sortParam}&input=${inputParam}&currentpage=${
            pageNumberParam - 1
          }&itemsperpage=10`
        );
        const data = response.data;

        setPaginationDetails(data.totalPages);
        setCurrentPageNumber(pageNumberParam);
        setAds(data.content.length > 0 ? data.content : null);
      } catch (err) {
        navigate("/error")
      }
    };
    fetchAds();
  }, []);

  return (
    <div>
      <Category />
      <Filter />
      {allAds ? (
        <>
          <Ads ads={allAds} />
          <Pagination elements={paginationDetails} />
        </>
      ) : (
        <h1 style={{ marginTop: 180 }}>
          <strong>No Ads found</strong>
        </h1>
      )}
    </div>
  );
}
