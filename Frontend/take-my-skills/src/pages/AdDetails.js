import { useEffect, useState, useRef } from "react";
import ProfilePhoto from "../shared/ProfilePhoto";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AdDetail() {
  const auth = useAuthUser();

  const { id } = useParams();

  const [adInfos, setAdInfos] = useState(null);
  const [adLocation, setAdLocation] = useState(null);
  const [editOrSave, setEditOrSave] = useState(false);
  const [showEditButtonOrNot, setShowEditButtonOrNot] = useState(false);
  const [buttonValue, setButtonValue] = useState("Edit Ad");
  // const [possibleStatuses, setossibleStatuses] = useState([
  //   "PENDING",
  //   "FINALISED",
  // ]);

  const adTitleRef = useRef("");
  const adDescriptionRef = useRef("");
  const adTypeOfAdRef = useRef("");
  const adPriceRef = useRef("");
  const adCountyRef = useRef("");
  const adCityRef = useRef("");

  const onSave = async () => {
    const editData = {
      title: adTitleRef.current.value,
      description: adDescriptionRef.current.value,
      typeOfAd: adTypeOfAdRef.current.value,
      price: adPriceRef,
      location: {
        nameOfTheCounty: adCountyRef.current.value,
        nameOfTheCity: adCityRef.current.value,
      },
    };
    try {
      await axios.put(`http://localhost:8080/ads/${id}`, editData);
    } catch (err) {
      console.log(err);
    }
  };

  const changeEdit = () => {
    if (editOrSave === false) {
      setEditOrSave(true);
      setButtonValue("Save");
    } else {
      onSave();
      setEditOrSave(false);
      setButtonValue("Edit Profile");
      window.location.reload(false);
    }
  };

  useEffect(() => {
    const getAdById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ads/${id}`);
        const data = response.data;
        setAdInfos(data);
        setShowEditButtonOrNot(auth().email === data.users[0].email);
        // if (data.users.length < 2) {

        // }
      } catch (err) {
        console.log(err);
      }
    };

    const getLocationsOfAd = async (adLoc) => {
      try {
        const response = await axios.get(
          `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=RO&adminDistrict=${adLoc.location.nameOfTheCounty}&locality=${adLoc.location.nameOfTheCity}&maxResults=20&key=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu`
        );
        const data = response.data.resourceSets[0].resources[0].point;
        setAdLocation(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdById();
    getLocationsOfAd(adInfos);
  }, [adInfos]);

  const colorDependingOnStatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return "primary";
      case "PENDING":
        return "warning";
      case "FINALISED":
        return "dark";
    }
  };

  return (
    <div className="container-xl">
      <div className="row container-xl" style={{ marginTop: 110 }}>
        {/* Titlu */}
        <div className="card container-xl col-8">
          <div className="card-body">
            {editOrSave ? (
              <>
                <label htmlFor="Title" className="form-label">
                  Title
                </label>
                <br></br>
                <input
                  name="title"
                  ref={adTitleRef}
                  defaultValue={adInfos?.title}
                  style={{ maxWidth: 300, height: 50 }}
                ></input>
                <div
                  id="Title-Help"
                  className="form-text"
                  style={{ color: "#fa6900" }}
                >
                  *Choose a new short and suggestive title
                </div>
              </>
            ) : (
              <h1>
                <h1>{adInfos?.title}</h1>
              </h1>
            )}
            <hr />
            <div
              className="mt-4 container-xl text-start"
              style={{ minHeight: "52vh" }}
            >
              {editOrSave ? (
                <>
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <br></br>
                  <textarea
                    className="container-xl"
                    name="description"
                    ref={adDescriptionRef}
                    defaultValue={adInfos?.description}
                    style={{ width: "100%", maxWidth: "500px" }} // Adjust the maximum width as needed
                  ></textarea>
                  <div
                    id="Title-Help"
                    className="form-text"
                    style={{ color: "#fa6900" }}
                  >
                    *Describe your expectations in detail in no more than 1000
                    characters
                  </div>
                </>
              ) : (
                <h5>{adInfos?.description}</h5>
              )}
            </div>
            {/* Div for Price and Status */}
            <div className="row">
              {/* Price */}
              {editOrSave ? (
                <div
                  className="input-group mb-4"
                  style={{ height: 50, width: 300 }}
                >
                  <span className="input-group-text">$</span>
                  <input
                    ref={adPriceRef}
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    name="title"
                    defaultValue={adInfos?.price}
                  />
                  <span className="input-group-text">.00</span>
                </div>
              ) : (
                <div
                  className="card text-white bg-success container-xl col-3"
                  style={{ height: 90 }}
                >
                  <div className="card-header">Price</div>
                  <div className="card-body">
                    <h5 className="card-title">{adInfos?.price}</h5>
                  </div>
                </div>
              )}

              {showEditButtonOrNot ? (
                <button
                  className="container-xl col-2 mt-3"
                  onClick={changeEdit}
                  style={{
                    backgroundColor: "#fa6900",
                    color: "white",
                    height: 60,
                  }}
                >
                  {buttonValue}
                </button>
              ) : null}

              {/* Status */}
              {editOrSave ? (
                <div>
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
              ) : (
                <div
                  className={`card text-white bg-${colorDependingOnStatus(
                    adInfos?.statusOfAd
                  )} container-xl col-3`}
                  style={{ height: 90 }}
                >
                  <div className="card-header">Status</div>
                  <div className="card-body">
                    <h5 className="card-title">{adInfos?.statusOfAd}</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profil */}
        <div className="container-xl col-4">
          <div className="card">
            <div className="card-body text-center">
              <a
                href={`/profile/${adInfos?.users[0].id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProfilePhoto width={"75"} height={"75"} />
                <h5 className="my-3">{adInfos?.users[0].name}</h5>
              </a>
              <p className="text-muted mb-1">{adInfos?.users[0].role}</p>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              />

              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <div className="d-flex justify-content-center"></div>
            </div>
          </div>

          <h4 className="mt-3">
            {adInfos?.location.nameOfTheCounty},
            {adInfos?.location.nameOfTheCity}
          </h4>
          <iframe
            className="mb-3"
            width="400"
            height="200"
            src={`https://www.bing.com/maps/embed/viewer.aspx?v=3&cp=${adLocation?.coordinates[0]}~${adLocation?.coordinates[1]}&lvl=12&w=400&h=200&credentials=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu&form=BMEMJS`}
            frameborder="0"
          ></iframe>

          {/* Card Worker */}
          <div class="card" style={{ height: 100 }}>
            {adInfos?.users[1] ? (
              <a
                href={`/profile/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="container-xl row text-center">
                  <div className="container-xl col-4" style={{ marginTop: 11 }}>
                    <ProfilePhoto width={"75"} height={"75"} />
                  </div>
                  <div className="container-xl col-4" style={{ marginTop: 20 }}>
                    <h4>{adInfos?.users[1].name}</h4>
                    <p className="mb-1">{adInfos?.users[1].role}</p>
                  </div>
                  <div className="container-xl col-4" style={{ marginTop: 40 }}>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                </div>
              </a>
            ) : (
              <h4 className="container-xl position-relative top-50 start-50 translate-middle">
                No worker has been selected for this project yet!
              </h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
