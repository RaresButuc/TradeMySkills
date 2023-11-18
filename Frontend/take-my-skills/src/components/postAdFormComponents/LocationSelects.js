import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const LocationSelects = forwardRef(
  ({ refCounty, refCity, countyFullName, ad }, ref) => {
    const [cities, setCities] = useState([]);
    const [counties, setCounties] = useState([]);
    const [countyAbrev, setCountyAbrev] = useState("");
    const [mainCity, setMainCity] = useState(
      ad ? ad.location.nameOfTheCity : "Select City"
    );

    useEffect(() => {
      const fetchCounties = async () => {
        try {
          const response = await axios.get("https://roloca.coldfuse.io/judete");
          const data = response.data;
          setCounties(data);
          if (ad && countyAbrev === "") {
            setCountyAbrev(
              data.filter((e) => e.nume === ad.location.nameOfTheCounty)[0].auto
            );
            countyFullName(ad?.location?.nameOfTheCounty);
          }
        } catch (err) {
          console.log(err);
        }
      };

      const fetchCities = async () => {
        if (countyAbrev) {
          try {
            const response = await axios.get(
              `https://roloca.coldfuse.io/orase/${countyAbrev}`
            );
            const data = response.data;
            if (data) {
              setCities(data);
            }
          } catch (err) {
            console.log(err);
          }
        }
      };

      fetchCounties();
      fetchCities();
    }, [countyAbrev, ad]);

    const chooseAuto = (e) => {
      setMainCity("Select City");
      countyFullName(
        counties.filter((e) => e.auto === refCounty.current.value)[0].nume
      );
      setCountyAbrev(e.target.value);
    };

    return (
      <>
        <div className="mb-4">
          <select
            className="form-select"
            aria-label="select category"
            ref={refCounty}
            onChange={chooseAuto}
          >
            <option
              disabled
              selected
              value={ad ? ad?.location?.nameOfTheCounty : ""}
            >
              {ad ? ad.location?.nameOfTheCounty : "Select County"}
            </option>
            {counties &&
              counties.map((county, index) => (
                <option value={county.auto} key={index}>
                  {county.nume}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            className="form-select"
            aria-label="select category"
            ref={refCity}
          >
            <option
              disabled
              selected
              value={mainCity === "Select City" ? "" : mainCity}
            >
              {mainCity}
            </option>
            {cities &&
              cities.map((city, index) => (
                <option value={city.nume} key={index}>
                  {city.nume}
                </option>
              ))}
          </select>
        </div>
      </>
    );
  }
);

export default LocationSelects;
