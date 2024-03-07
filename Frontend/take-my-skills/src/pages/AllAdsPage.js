import axios from "axios";
import { useState, useEffect } from "react";

import Ads from "../components/Ads";
import Filter from "../components/Filter";
import ErrorPage from "../pages/ErrorPage";
import Category from "../components/Category";
import Pagination from "../components/Pagination";

export default function AllOffer() {
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

        setAds(data.content);
        setCurrentPageNumber(pageNumberParam);
        setPaginationDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAds();
  }, []);

  return (
    <div>
      {paginationDetails?.totalPages == 0 ? (
        <>
          <Category />
          <Filter />
          <h1 style={{ marginTop: 210 }}>
            <strong>No Ads found</strong>
          </h1>
        </>
      ) : currentPageNumber > paginationDetails?.totalPages ||
        currentPageNumber < 1 ? (
        <ErrorPage />
      ) : (
        <>
          <Category />
          <Filter />
          <Ads ads={allAds} />
          <Pagination elements={paginationDetails} />
        </>
      )}
    </div>
  );
}
