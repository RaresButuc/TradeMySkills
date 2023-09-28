import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";

export default function FormAddNewAd() {
  const [categories, setCategories] = useState([]);

  const [cities, setCities] = useState([]);

  const [counties, setCounties] = useState([]);
  const [countyAbrev, setCountyAbrev] = useState("");

  const titleOfAd = useRef("");
  const descriptonOfAd = useRef("");
  const categoryOfAd = useRef(null);
  const priceOfAd = useRef(0);
  const [countyChosen, setCountyChosen] = useState("");
  const [cityChosen, setCity] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/category");
        const data = response.data;
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCounties = async () => {
      try {
        const response = await axios.get("https://roloca.coldfuse.io/judete");
        const data = response.data;
        setCounties(data);
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
          console.log(data);
          if (data) {
            setCities(data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchCategories();
    fetchCounties();
    fetchCities();
  }, [countyAbrev]);

  const chooseAuto = (countyAbrev) => {
    setCountyChosen(counties.filter((e) => e.auto == countyAbrev)[0].nume);
    setCountyAbrev(countyAbrev);
  };

  // const postNewAd = ()

  return (
    <div className="container-xl" style={{ marginTop: 130 }}>
      <form>
        <div class="mb-3">
          <label for="Title" class="form-label">
            Title
          </label>
          <input
            ref={titleOfAd}
            class="form-control"
            id="Title"
            aria-describedby="Title-Help"
          />
          <div id="Title-Help" class="form-text">
            *Choose a short and suggestive title
          </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Description
          </label>
          <input
            ref={descriptonOfAd}
            class="form-control"
            id="description"
            style={{ height: 150 }}
          />
          <div id="Title-Help" class="form-text">
            *Describe your needs in detail
          </div>
        </div>
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="select category"
            ref={categoryOfAd}
          >
            <option disabled selected>
              Select category{" "}
            </option>
            {categories &&
              categories.map((category, index) => (
                <option value={category.id} key={index}>
                  {category.nameOfCategory}
                </option>
              ))}
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input
            ref={priceOfAd}
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
          />
          <span class="input-group-text">.00</span>
        </div>

        <div class="mb-3">
          <select
            class="form-select"
            aria-label="select category"
            onChange={(e) => chooseAuto(e.target.value)}
          >
            <option disabled selected>
              Select county{" "}
            </option>
            {counties &&
              counties.map((county, index) => (
                <option value={county.auto} key={index}>
                  {county.nume}
                </option>
              ))}
          </select>
        </div>

        <div class="mb-3">
          <select
            class="form-select"
            aria-label="select category"
            onChange={(e) => setCity(e.target.value)}
          >
            <option disabled selected>
              Select city{" "}
            </option>
            {cities &&
              cities.map((city, index) => (
                <option value={city.nume} key={index}>
                  {city.nume}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
