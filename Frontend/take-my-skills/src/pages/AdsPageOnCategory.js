import Ads from "../components/Ads";
import logoMap from "../photo/icons/MapPointer.png";
import logoMoney from "../photo/icons/PayMoney.png";
import Filter from "../components/Filter";
import Category from "../components/Category";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdsPageOnCategory(adsLink) {
  const params = useParams();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/ads/category/" + params.category
        );
        const data = response.data;
        setAds(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAds();
  }, [params.category]);

  return (
    <div>
      <Category />
      <Filter />
      <Ads ads={ads} /> {/* Pass the ads data as a prop to the Ads component */}
    </div>
  );
}
