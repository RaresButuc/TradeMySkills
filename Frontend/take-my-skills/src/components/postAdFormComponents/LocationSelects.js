import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const LocationSelects = forwardRef(
  ({ refCounty, refCity, countyFullName, ad }, ref) => {
    const [cities, setCities] = useState([]);
    const [counties, setCounties] = useState([]);
    const [countyAbrev, setCountyAbrev] = useState("");

    useEffect(() => {
      const fetchCounties = async () => {
        try {
          const response = await axios.get("https://roloca.coldfuse.io/judete");
          const data = response.data;
          if (ad) {
            setCounties(
              data.filter((e) => e.nume !== ad.location.nameOfTheCounty)
            );
          } else {
            setCounties(data);
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
            if (ad) {
              setCities(
                data.filter((e) => e.nume !== ad.location.nameOfTheCity)
              );
            }
          } catch (err) {
            console.log(err);
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
////////////////Make the choosing cty work
    return (
      <>
        <div className="mb-4">
          <select
            className="form-select"
            aria-label="select category"
            ref={refCounty}
            onChange={chooseAuto}
          >
            <option disabled selected value={ad ? ad.location.nameOfTheCity : ""}>
              {ad ? ad.location.nameOfTheCounty : "Select county"}
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
            <option disabled selected value={ad ? ad.location.nameOfTheCity : ""}>
              Select city
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
