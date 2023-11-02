import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function FormAddNewAd() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const [currentUser, setCurrentUser] = useState(null);

  const [categories, setCategories] = useState([]);

  const [cities, setCities] = useState([]);

  const [counties, setCounties] = useState([]);
  const [countyAbrev, setCountyAbrev] = useState("");

  const titleOfAd = useRef("");
  const descriptonOfAd = useRef("");
  const categoryOfAd = useRef("");
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
          if (data) {
            setCities(data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/email/${auth().email}`
        );
        const data = response.data;
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
    fetchCounties();
    fetchCities();
    fetchCurrentUser();
  }, [countyAbrev]);

  const chooseAuto = (countyAbrev) => {
    setCountyChosen(counties.filter((e) => e.auto === countyAbrev)[0].nume);
    setCountyAbrev(countyAbrev);
  };

  //Pune si user
  const postNewAd = async (
    titleAd,
    descriptionAd,
    categoryAd,
    priceAd,
    countyAd,
    cityAd
  ) => {
    try {
      // console.log(auth())
      console.log(currentUser);

      const response = await fetch("http://localhost:8080/ads", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: titleAd,
          description: descriptionAd,
          typeOfAd: { id: categoryAd },
          price: priceAd,
          user: { id: currentUser.id }, // Fixed user object format
          location: { nameOfTheCounty: countyAd, nameOfTheCity: cityAd },
        }),
      });

      if (response.status === 200) {
        navigate("/all-ads");
      } else {
        console.error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        console.error(data);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <form style={{ marginTop: 95 }}>
      <div className="container-xl">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5 text-center">
                <h1 className="mb-3">Post A New Ad</h1>
                <hr />
                <div className="mb-4">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    ref={titleOfAd}
                    className="form-control"
                    id="Title"
                    aria-describedby="Title-Help"
                  />
                  <div
                    id="Title-Help"
                    className="form-text"
                    style={{ color: "#fa6900" }}
                  >
                    *Choose a short and suggestive title
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    ref={descriptonOfAd}
                    className="form-control"
                    id="description"
                    style={{ height: 150 }}
                  />
                  <div
                    id="Title-Help"
                    className="form-text"
                    style={{ color: "#fa6900" }}
                  >
                    *Describe your needs in detail
                  </div>
                </div>

                <div className="mb-4">
                  <select
                    className="form-select"
                    aria-label="select category"
                    ref={categoryOfAd}
                  >
                    <option disabled selected>
                      Select category
                    </option>
                    {categories &&
                      categories.map((category, index) => (
                        <option value={category.id} key={index}>
                          {category.nameOfCategory}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="input-group mb-4">
                  <span className="input-group-text">$</span>
                  <input
                    ref={priceOfAd}
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <span className="input-group-text">.00</span>
                </div>

                <div className="mb-4">
                  <select
                    className="form-select"
                    aria-label="select category"
                    onChange={(e) => chooseAuto(e.target.value)}
                  >
                    <option disabled selected>
                      Select county
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
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option disabled selected>
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

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    postNewAd(
                      titleOfAd.current.value,
                      descriptonOfAd.current.value,
                      categoryOfAd.current.value,
                      priceOfAd.current.value,
                      countyChosen,
                      cityChosen
                    );
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
