import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthUser, useAuthHeader } from "react-auth-kit";

import Alert from "../components/Alert";
import DefaultURL from "../GlobalVariables";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../shared/ProfilePhoto";
import RatingCard from "../components/RatingCard";
import StarsRating from "../components/StarsRating";

export default function UserProfilePage() {
  const ratingsPerPage = 4;

  const auth = useAuthUser();
  const { id } = useParams();
  const token = useAuthHeader();
  const navigate = useNavigate();

  const [isLast, setIsLast] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [editOrSave, setEditOrSave] = useState(0);
  const [curentPage, setCurrentPage] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const [buttonValue, setButtonValue] = useState("Edit Profile");
  const [showEditButtonOrNot, setShowEditButtonOrNot] = useState(false);
  const [buttonContent, setButtonContent] = useState("See More Ratings");

  const userNameRef = useRef("");
  const userEmailRef = useRef("");
  const userPhoneNumberRef = useRef("");

  console.log(ratings?.length);

  const handleSeeMore = () => {
    if (!isLast) {
      setCurrentPage(curentPage + 1);
    } else {
      setCurrentPage(0);
      setRatings(null);
      setButtonContent("See More Ratings");
      setIsLast(false);
      console.log("intra");
    }
  };

  const onSave = async () => {
    const headers = { Authorization: token() };
    const editData = {
      name: userNameRef.current?.value,
      phoneNumber: userPhoneNumberRef.current?.value,
      email: userEmailRef.current?.value,
    };
    try {
      const response = await axios.put(`${DefaultURL}/users/update`, editData, {
        headers,
      });
      fetchCurrentUser();

      setShowAlert(true);
      setAlertInfos(["success", response.data]);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (err) {
      setShowAlert(true);
      setAlertInfos(["danger", err.response.data.message]);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const changeEdit = () => {
    if (editOrSave === 0) {
      setEditOrSave(1);
      setButtonValue("Save");
    } else {
      onSave();
      setEditOrSave(0);
      setButtonValue("Edit Profile");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${DefaultURL}/users/${id}`);
      const data = response.data;
      setCurrentUser(data);
      setShowEditButtonOrNot(data?.email === auth()?.email);
    } catch (err) {
      navigate("/error");
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        `${DefaultURL}/ratings/getRatingsByUser/${curentPage}/${ratingsPerPage}/${id}`
      );

      const data = response.data;
      console.log(data);
      if (data.last) {
        setIsLast(true);
        setButtonContent("See Less Ratings");
      }

      if (ratings === null) {
        setRatings(data.content);
      } else {
        setRatings([...ratings, ...data.content]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (auth() === null) {
      setEditOrSave(0);
    }

    if (id) {
      fetchCurrentUser();
      fetchRatings();
    }
  }, [auth(), id, curentPage]);

  return (
    <>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}

      <section>
        <div className="container py-5 mt-5">
          <div className="row ">
            <div className="col-lg-4">
              <div className="card mb-3 ">
                <div className="card-body text-center">
                  <ProfilePhoto width={"110"} height={"110"} />

                  <h5 className="my-3">{currentUser?.name}</h5>
                  <p className="text-muted mb-1">
                    {currentUser?.role.slice(5)}
                  </p>

                  <StarsRating userRating={currentUser?.averageRating} />
                  <div className="d-flex justify-content-center mb-4"></div>
                  {showEditButtonOrNot ? (
                    <button
                      onClick={changeEdit}
                      style={{
                        backgroundColor: "rgba(18, 126, 128, 1)",
                        color: "white",
                      }}
                    >
                      {buttonValue}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-5">
                <div className="card-body">
                  <div className="row my-2">
                    <div className="col-sm-3">
                      <p className="mb-0">UserName</p>
                    </div>
                    <div className="col-sm-9">
                      {editOrSave === 0 ? (
                        <p className="text-muted mb-0">{currentUser?.name}</p>
                      ) : (
                        <input
                          name="username"
                          ref={userNameRef}
                          defaultValue={currentUser?.name}
                        ></input>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row my-2">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      {editOrSave === 0 ? (
                        <p className="text-muted mb-0">{currentUser?.email}</p>
                      ) : (
                        <input
                          type="email"
                          ref={userEmailRef}
                          name="email"
                          defaultValue={currentUser?.email}
                        ></input>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row my-2">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      {editOrSave === 0 ? (
                        <p className="text-muted mb-0">
                          {" "}
                          {currentUser?.phoneNumber}
                        </p>
                      ) : (
                        <input
                          inputMode="numeric"
                          pattern="[0-9]*"
                          type="text"
                          ref={userPhoneNumberRef}
                          name="phoneNumber"
                          defaultValue={currentUser?.phoneNumber}
                        ></input>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="d-grid gap-1 ">
                  {currentUser?.role === "ROLE_WORKER" ? (
                    <a
                      className="btn btn-warning font-weight-bold  mx-1  "
                      aria-current="page"
                      href={`/${currentUser?.id}/pending`}
                    >
                      Pending Ads
                    </a>
                  ) : (
                    <div className="row ">
                      <a
                        className="btn btn-primary font-weight-bold  mx-3   col"
                        aria-current="page"
                        href={`/${currentUser?.id}/active`}
                      >
                        Active Ads
                      </a>

                      <a
                        className="btn btn-warning font-weight-bold  mx-3 col "
                        aria-current="page"
                        href={`/${currentUser?.id}/pending`}
                      >
                        Pending Ads
                      </a>
                    </div>
                  )}

                  <a
                    className="btn btn-secondary font-weight-bold  mx-1  "
                    aria-current="page"
                    href={`/${currentUser?.id}/finalised`}
                  >
                    Finalised Ads
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container xl">
        <div className="row ">
          {ratings &&
            ratings?.map((e) => (
              <RatingCard
                userId={e.from.id}
                userName={e.from.name}
                rating={e}
              />
            ))}
        </div>
        {ratings && ratings?.length >= 4 ? (
          <div className="row">
            <button
              onClick={() => handleSeeMore()}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              className="mt-4"
            >
              <hr className="hr-text" data-content={buttonContent}></hr>
            </button>
          </div>
        ) : null}
        {ratings?.length === 0 ? (
          <h2>This User Does Not Have Any Ratings.</h2>
        ) : null}
      </div>
    </>
  );
}
