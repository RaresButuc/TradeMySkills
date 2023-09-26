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
      const sortParam = new URLSearchParams(window.location.search).get("sort");
      console.log(`http://localhost:8080/ads?sort=${sortParam}`);
   
       const response = await axios.get(`http://localhost:8080/ads?sort=${sortParam}`)
     
      const data = response.data;
       console.log(data)

      setAds(data);
      setSortMethod(sortParam); // Set the sorting method
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
