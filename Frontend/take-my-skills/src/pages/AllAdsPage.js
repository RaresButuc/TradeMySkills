import Category from "../components/Category";
import Ads from "../components/Ads";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AllOffer() {
  const [allAds, setAds] = useState([]);
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
          `http://localhost:8080/ads?category=${categoryParam}&sort=${sortParam}&input=${inputParam}&currentpage=${pageNumberParam-1}&itemsperpage=10`
        );

        const data = response.data;

        setAds(data.content);
        setPaginationDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAds();
  }, []);

  return (
    <div>
      <Category />
      <Filter />
      <Ads ads={allAds} />
      <Pagination elements={paginationDetails} />
    </div>
  );
}
