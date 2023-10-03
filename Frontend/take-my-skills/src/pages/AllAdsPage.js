import Category from "../components/Category";
import Ads from "../components/Ads";
import Filter from "../components/Filter";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AllOffer() {
  const [allAds, setAds] = useState([]);
  const [sortMethod, setSortMethod] = useState(null);

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

        const response = await axios.get(
          `http://localhost:8080/ads?category=${categoryParam}&sort=${sortParam}&input=${inputParam}`
        );

        const data = response.data;
        console.log(data);

        setAds(data);
        setSortMethod(sortParam);
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
    </div>
  );
}
