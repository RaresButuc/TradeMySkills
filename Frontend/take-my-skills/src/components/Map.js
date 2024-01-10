import { useEffect, useState } from "react";
import axios from "axios";

export default function Map({ city, county }) {
  const [adLocation, setAdLocation] = useState([]);

  useEffect(() => {
    const getLocationsOfAd = async () => {
      try {
        const response = await axios.get(
          `https://geocode.maps.co/search?city=${city}&county=${county}&country=Romania`
        );
        const data = response.data[0];
        setAdLocation([data.lat, data.lon]);
      } catch (err) {
        console.log(err);
      }
    };
    getLocationsOfAd();
  }, [city, county]);

  const generateMapURL = () => {
    if (adLocation.length === 2) {
      return `https://www.bing.com/maps/embed/viewer.aspx?v=3&cp=${adLocation[0]}~${adLocation[1]}&lvl=12&w=400&h=200&credentials=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu&form=BMEMJS`;
    }
    return "";
  };

  return (
    <iframe
      className="mb-3 "
      width="400"
      height="200"
      src={generateMapURL()}
      frameborder="0"
    />
  );
}
