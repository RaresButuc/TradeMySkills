import axios from "axios";
import ProfilePhoto from "../shared/ProfilePhoto";
import Map from "../components/Map";
import DefaultURL from "../GlobalVariables";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState, useRef } from "react";

import TitleInput from "../components/postAdFormComponents/TitleInput";
import DescriptionInput from "../components/postAdFormComponents/DescriptionInput";
import PriceInput from "../components/postAdFormComponents/PriceInput";
import CategorySelect from "../components/postAdFormComponents/CategorySelect";
import LocationSelects from "../components/postAdFormComponents/LocationSelects";
import StarsRating from "../components/StarsRating";
import ApplyButton from "../components/ApplyButton";
import Alert from "../components/Alert";


export default function AdDetail() {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const [adInfos, setAdInfos] = useState(null);
  const [editOrSave, setEditOrSave] = useState(false);
  const [showEditButtonOrNot, setShowEditButtonOrNot] = useState(false);
  const [buttonValue, setButtonValue] = useState("Edit Ad");
  const [charactersTextArea, setCharactersTextArea] = useState(0);
  const [countyChosenFullName, setCountyChosenFullName] = useState("");
  const [apply, setApply] = useState(false);
  const [applyButtonContent, setApplyButtonContent] = useState("Apply");
  const [loggedUser, setLoggedUser] = useState(null);
  const [isWorkerRefused, setIsWorkerRefused] = useState(false);

  const adTitleRef = useRef("");
  const adDescriptionRef = useRef("");
  const adTypeOfAdRef = useRef("");
  const adPriceRef = useRef("");
  const adCountyRef = useRef("");
  const adCityRef = useRef("");
  const adStatusRef = useRef("");

  const handleFinalised = async () => {
    setShowAlert(true);
    try {
      await axios.post(`${DefaultURL}/mail/send/${adInfos?.worker.email}`, {
        subject: "Please rate your experience!",
        message: `
        Hello ${adInfos?.worker.name}! The ad  ${adInfos?.title} was successfully finalised. Please rate the owner 
        http://localhost:3000/rating/${adInfos?.worker.id}/${adInfos?.owner.id} 
  
        `,
      });
      await axios.post(`${DefaultURL}/mail/send/${adInfos?.owner.email}`, {
        subject: "Please rate your experience!",
        message: `
        Hello ${adInfos?.owner.name}! The ad  ${adInfos?.title} was successfully finalised. Please rate the owner 
        http://localhost:3000/rating/${adInfos?.owner.id}/${adInfos?.worker.id} 
  
        `,
      });
      await axios.put(`http://localhost:8080/ads/finalised/${adInfos?.id}`);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleApply = async () => {
    console.log("handleApply");
    if (!apply) {
      try {
        await axios.put(`${DefaultURL}/ads/add/${id}/${loggedUser?.name}`);
        setApply(true);
        setApplyButtonContent("Cancel Apply");
        setAdInfos(null);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(`${DefaultURL}/ads/delete/${id}/${loggedUser?.name}`);
        setApply(false);
        setAdInfos(null);
        setApplyButtonContent("Apply");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteWorkerButton = async () => {
    try {
      await axios.post(`${DefaultURL}/mail/send/${adInfos?.worker.email}`, {
        subject: "Rejected from Ad",
        message: `Hello ${adInfos?.worker.name}! Unfortunately you have been kicked from ${adInfos?.title}. For more informations contact owner.`,
      });
      await axios.put(`${DefaultURL}/ads/delete/${id}/${adInfos?.worker.name}`);
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
        await axios.put(`${DefaultURL}/ads/${id}`, editData);
        setAdInfos(null);
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

  const isAdInfosEqualToData = (adInfo, data) => {
    if (adInfo === null) {
      return false;
    }
    return JSON.stringify(adInfo) === JSON.stringify(data);
  };

  useEffect(() => {
    setApply(adInfos?.worker === null ? false : true);
    console.log("set apply useEfect " + apply);
    setApplyButtonContent(adInfos?.worker === null ? "Apply" : "Cancel Apply");

    const getAdById = async () => {
      try {
        const response = await axios.get(`${DefaultURL}/ads/${id}`);
        const data = response.data;
        if (!isAdInfosEqualToData(adInfos, data)) {
          setAdInfos(data);
        }
        setShowEditButtonOrNot(auth().email === data.owner.email);
      } catch (err) {
        console.log(err);
      }
    };

    const getUserByEmail = async () => {
      try {
        const response = await axios.get(
          `${DefaultURL}/users/email/${auth().email}`
        );
        const data = response.data;
        setLoggedUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    const isWorkerRefused = async () => {
      try {
        const response = await axios.get(
          `${DefaultURL}/ads/rejected/${id}/${loggedUser?.name}`
        );
        setIsWorkerRefused(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAdById();
    getUserByEmail();
    isWorkerRefused();
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
    <div>
      {showAlert && (
        <Alert type="success" message="Your ad have succesfully finalised!" />
      )}

      <div className="container-xl">
        <div className="row container-xl" style={{ marginTop: 110 }}>
          {/* Titlu */}
          <div className="card container-xl col-xl-8 col-md-8 col-sm-12">
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
                <h1>{adInfos?.title}</h1>
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
                      <h6 className="card-title">{adInfos?.price}</h6>
                    </div>
                  </div>
                )}
                {adInfos?.statusOfAd ===
                "FINALISED" ? null : showEditButtonOrNot ? (
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
                ) : loggedUser?.role === "ROLE_WORKER" ? (
                  <>
                    {isWorkerRefused ? null : (
                      <ApplyButton
                        applyOrCancel={apply}
                        onClickFunction={handleApply}
                        buttonContent={applyButtonContent}
                      />
                    )}
                  </>
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
                    <br></br>
                    <button
                      type="button "
                      className="btn btn-success"
                      disabled={adInfos?.worker === null ? true : false}
                      data-bs-toggle="modal"
                      data-bs-target="#finishModal"
                    >
                      Set FINALISED
                    </button>
                    <div
                      className="modal fade"
                      id="finishModal"
                      tabindex="-1"
                      aria-labelledby="finishModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="finishModalLabel">
                              Important!
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Are you sure you want to set this ad as FINALISED?
                            You will not be able to edit it ever.
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleFinalised}
                              data-bs-dismiss="modal"
                            >
                              Change it!
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <h6 className="card-title">{adInfos?.statusOfAd}</h6>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profil */}
          <div className="container-xl col-xl-4 col-md-4 col-sm-12 my-sm-3  my-xl-0 my-md-0">
            <div className="card">
              <div className="card-body text-center">
                <a
                  href={`/profile/${adInfos?.owner.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ProfilePhoto width={"75"} height={"75"} />
                  <h5 className="my-3">{adInfos?.owner.name}</h5>
                </a>
                <p className="text-muted mb-1">{adInfos?.owner.role}</p>
                <StarsRating userRating={adInfos?.owner.averageRating} />
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

                <Map
                  city={adInfos?.location.nameOfTheCity}
                  county={adInfos?.location.nameOfTheCounty}
                />
              </>
            )}

            {/* Card Worker */}
            <div className="mt-3 border border-dark">
              {adInfos?.worker ? (
                <>
                  <a
                    href={`/profile/${id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="container-xl row text-center">
                      <div
                        className="container-xl col-3"
                        style={{ marginTop: 11 }}
                      >
                        <ProfilePhoto width={"75"} height={"75"} />
                      </div>

                      <div
                        className="container-xl col-3"
                        style={{ marginTop: 20 }}
                      >
                        <h4>{adInfos?.worker.name}</h4>
                        <p className="mb-1">{adInfos?.worker.role}</p>
                      </div>

                      <div
                        className="container-xl col-6"
                        style={{ marginTop: 40 }}
                      >
                        <div className="container-xl">
                          <StarsRating
                            userRating={adInfos?.worker.averageRating}
                          />
                        </div>
                      </div>
                    </div>
                  </a>

                  {showEditButtonOrNot ? (
                    <>
                      {adInfos?.statusOfAd === "FINALISED" ? null : (
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
                      )}

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Important!
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete this worker?
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={deleteWorkerButton}
                                data-bs-dismiss="modal"
                              >
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
                <>
                  {isWorkerRefused ? (
                    <h5 className="container-xl " style={{ color: "red" }}>
                      You have been kicked from this project! <br />
                      For more informations contact the owner of the ad!
                    </h5>
                  ) : (
                    <h5 className="container-xl my-4">
                      No worker has been selected for this project yet!
                    </h5>
                  )}
                </>
              )}
            </div>
            {editOrSave ? (
              <a
                className="container-xl mt-5 btn btn-primary"
                href={`/ad/${adInfos?.id}/rejectedworkers`}
              >
                Rejected Workers
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
