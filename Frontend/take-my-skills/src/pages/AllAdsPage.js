import Category from "../components/Category";
import Ads from "../components/Ads";
import Filter from "../components/Filter";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AllOffer() {
  const [allAds, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ads");
        const data = response.data;
        console.log(data);
        setAds(data);
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
