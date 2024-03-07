import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const LocationSelects = forwardRef(
  ({ refCounty, refCity, countyFullName, ad }, ref) => {
    const [cities, setCities] = useState([]);
    const [counties, setCounties] = useState([]);
    const [countyAbrev, setCountyAbrev] = useState("");
    const [mainCity, setMainCity] = useState(
      ad ? ad.location.nameOfTheCity : null
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
          setCounties(null);
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
            setCities(null);
          }
        }
      };

      fetchCounties();
      fetchCities();
    }, [countyAbrev]);

    const chooseAuto = (e) => {
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
            defaultValue={ad ? ad.location.nameOfTheCounty : null}
          >
            <option disabled selected>
              {ad
                ? ad.location?.nameOfTheCounty
                : counties
                ? "Select County"
                : "No Counties Available! Try Again Later"}
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
            // defaultValue={ad ? ad.location.nameOfTheCity : ""}
          >
            <option
              disabled
              selected
              value={ad ? ad.location.nameOfTheCity : ""}
            >
              {ad
                ? ad.location?.nameOfTheCity
                : counties
                ? "Select City"
                : "No Cities Available! Try Again Later"}
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
