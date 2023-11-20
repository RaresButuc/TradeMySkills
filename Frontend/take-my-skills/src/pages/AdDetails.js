import axios from "axios";
import ProfilePhoto from "../shared/ProfilePhoto";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState, useRef } from "react";

import TitleInput from "../components/postAdFormComponents/TitleInput";
import DescriptionInput from "../components/postAdFormComponents/DescriptionInput";
import PriceInput from "../components/postAdFormComponents/PriceInput";
import CategorySelect from "../components/postAdFormComponents/CategorySelect";
import LocationSelects from "../components/postAdFormComponents/LocationSelects";

export default function AdDetail() {
  const auth = useAuthUser();

  const { id } = useParams();

  const [adInfos, setAdInfos] = useState(null);
  const [editOrSave, setEditOrSave] = useState(false);
  const [showEditButtonOrNot, setShowEditButtonOrNot] = useState(false);
  const [buttonValue, setButtonValue] = useState("Edit Ad");
  const [possibleStatuses, setPossibleStatuses] = useState([]);
  const [charactersTextArea, setCharactersTextArea] = useState(0);
  const [countyChosenFullName, setCountyChosenFullName] = useState("");

  const adTitleRef = useRef("");
  const adDescriptionRef = useRef("");
  const adTypeOfAdRef = useRef("");
  const adPriceRef = useRef("");
  const adCountyRef = useRef("");
  const adCityRef = useRef("");
  const adStatusRef = useRef("");

  const deleteWorkerButton = async() => {
    try {
      await axios.put(`http://localhost:8080/ads/delete/${id}/${adInfos?.users[1].name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onSave = async () => {
    if (
      adTitleRef.current.value !== "" &&
      adDescriptionRef.current.value !== "" &&
      adPriceRef.current.value !== "" &&
      adCountyRef.current.value !== "" &&
      adCityRef.current.value !== ""
    ) {
      const editData = {
        statusOfAd: adStatusRef.current.value,
        title: adTitleRef.current.value,
        description: adDescriptionRef.current.value,
        typeOfAd: { id: adTypeOfAdRef.current.value },
        price: adPriceRef.current.value,
        location: {
          nameOfTheCounty: countyChosenFullName,
          nameOfTheCity: adCityRef.current.value,
        },
      };
      try {
        await axios.put(`http://localhost:8080/ads/${id}`, editData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const changeEdit = () => {
    if (editOrSave === false) {
      setEditOrSave(true);
      setButtonValue("Save");
      setCharactersTextArea(adInfos.description.length);
    } else {
      onSave();
      setEditOrSave(false);
      setButtonValue("Edit Profile");
    }
  };

  useEffect(() => {
    const getAdById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ads/${id}`);
        const data = response.data;
        setAdInfos(data);
        setShowEditButtonOrNot(auth().email === data.users[0].email);
        if (data.users.length < 2) {
          setPossibleStatuses(["ACTIVE", "PENDING", "FINALISED"]);
        } else {
          setPossibleStatuses(["PENDING", "FINALISED"]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    // const getLocationsOfAd = async (adLoc) => {
    //   try {
    //     const response = await axios.get(
    //       `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=RO&adminDistrict=${adLoc.location.nameOfTheCounty}&locality=${adLoc.location.nameOfTheCity}&maxResults=20&key=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu`
    //     );
    //     const data = response.data.resourceSets[0].resources[0].point;
    //     setAdLocation(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // getLocationsOfAd(adInfos);
    getAdById();
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

  const countingCharactersDescription = (e) => {
    setCharactersTextArea(e.target.value.length);
  };

  return (
    <div className="container-xl">
      <div className="row container-xl" style={{ marginTop: 110 }}>
        {/* Titlu */}
        <div className="card container-xl col-8">
          <div className="card-body">
            {editOrSave ? (
              <>
                <TitleInput
                  message={"Choose a short and suggestive title"}
                  ad={adInfos}
                  ref={adTitleRef}
                />
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
                  <DescriptionInput
                    ad={adInfos}
                    countingCharactersDescription={
                      countingCharactersDescription
                    }
                    message={charactersTextArea + "/ 1000"}
                    ref={adDescriptionRef}
                  />
                </>
              ) : (
                <h5>{adInfos?.description}</h5>
              )}
            </div>
            {/* Div for Price and Status */}
            <div className="row">
              {/* Price */}
              {editOrSave ? (
                <div className="mb-4" style={{ height: 50, width: 300 }}>
                  <label className="form-label fw-bold text-decoration-underline">
                    Price
                  </label>
                  <PriceInput ad={adInfos} ref={adPriceRef} />
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
                <div className="mb-4" style={{ height: 50, width: 300 }}>
                  <label
                    htmlFor="status"
                    className="form-label fw-bold text-decoration-underline"
                  >
                    Status
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    ref={adStatusRef}
                  >
                    <option selected>{adInfos?.statusOfAd}</option>
                    {possibleStatuses &&
                      possibleStatuses
                        .filter((e) => e !== adInfos?.statusOfAd)
                        .map((status, index) => (
                          <option value={status} key={index}>
                            {status}
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

          {editOrSave ? (
            <>
              <label className="form-label fw-bold text-decoration-underline mt-4">
                Category
              </label>
              <CategorySelect ref={adTypeOfAdRef} ad={adInfos} />
            </>
          ) : null}

          {editOrSave ? (
            <>
              <label className="form-label fw-bold text-decoration-underline mt-4">
                Location
              </label>
              <LocationSelects
                ad={adInfos}
                refCity={adCityRef}
                refCounty={adCountyRef}
                ref={null}
                countyFullName={(countyName) => {
                  setCountyChosenFullName(countyName);
                }}
              />
            </>
          ) : (
            <>
              <h4 className="mt-3">
                {adInfos?.location.nameOfTheCounty},
                {adInfos?.location.nameOfTheCity}
              </h4>
              {/* <iframe
                className="mb-3"
                width="400"
                height="200"
                src={`https://www.bing.com/maps/embed/viewer.aspx?v=3&cp=${adLocation?.coordinates[0]}~${adLocation?.coordinates[1]}&lvl=12&w=400&h=200&credentials=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu&form=BMEMJS`}
                frameborder="0"
              /> */}
            </>
          )}

          {/* Card Worker */}
          <div class="card" style={{ height: 100 }}>
            {adInfos?.users[1] ? (
              <>
                <a
                  href={`/profile/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="container-xl row text-center">
                    <div
                      className="container-xl col-4"
                      style={{ marginTop: 11 }}
                    >
                      <ProfilePhoto width={"75"} height={"75"} />
                    </div>
                    <div
                      className="container-xl col-4"
                      style={{ marginTop: 20 }}
                    >
                      <h4>{adInfos?.users[1].name}</h4>
                      <p className="mb-1">{adInfos?.users[1].role}</p>
                    </div>
                    <div
                      className="container-xl col-4"
                      style={{ marginTop: 40 }}
                    >
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </div>
                  </div>
                </a>
                {showEditButtonOrNot ? (
                  <>
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#fa6900",
                        color: "white",
                      }}
                      className="mt-2 "
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Delete Worker
                    </button>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Important!
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            Are you sure you want to delete this worker?
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-primary" onClick={deleteWorkerButton} data-bs-dismiss="modal">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
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
