import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultURL from "../GlobalVariables";
import Ads from "./Ads";
import axios from "axios";
import writeAWordWithoutFullUppercase from "../shared/WordUppercase";

export default function AdsByStatusPage({ status }) {
  const [adsByStatus, setAdsByStatus] = useState(null);
  const [nameOfUser, setNameOfUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchAdsByStatus = async () => {
      const responseAds = await axios.get(
        `${DefaultURL}/ads/profile/${id}/${status}`
      );
      const responseUser = await axios.get(`${DefaultURL}/users/${id}`);
      const dataAds = responseAds.data;
      setAdsByStatus(dataAds);
      const dataUser = responseUser.data;
      setNameOfUser(dataUser.name);
    };

    fetchAdsByStatus();
  }, []);


  return (
    <div className="container-xl" style={{ marginTop: 100 }}>
      <h1>
        {nameOfUser}'s {writeAWordWithoutFullUppercase(status)} Ads:
      </h1>
      <hr />
      <Ads ads={adsByStatus} />
    </div>
  );
}
