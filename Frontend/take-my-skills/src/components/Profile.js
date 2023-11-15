import React, { useState, useRef, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

export default function Profile({ id }) {
  const auth = useAuthUser();

  const [currentUser, setCurrentUser] = useState(null);
  const [showEditButtonOrNot, setShowEditButtonOrNot] = useState(false);
  const [editOrSave, setEditOrSave] = useState(0);
  const [buttonValue, setButtonValue] = useState("Edit Profile");

  const userNameRef = useRef("");
  const userPhoneNumberRef = useRef("");
  const userEmailRef = useRef("");

  const onSave = async () => {
    const editData = {
      name: userNameRef.current.value,
      phoneNumber: userPhoneNumberRef.current.value,
      email: userEmailRef.current.value,
    };
    try {
      await axios.put(
        `http://localhost:8080/users/${currentUser.id}`,
        editData
      );
    } catch (err) {
      console.log(err);
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
      window.location.reload(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchCurrentUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/users/${id}`);
          const data = response.data;
          setCurrentUser(data);
          setShowEditButtonOrNot(data.email === auth().email);
        } catch (err) {
          console.log(err);
        }
      };

      fetchCurrentUser();
    } ///
  }, [auth().email, id]); 
  return (
    <section>
      <div className="container py-5 mt-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="110"
                  height="110"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>

                <h5 className="my-3">{currentUser?.name}</h5>
                <p className="text-muted mb-1">{currentUser?.role}</p>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />

                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
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
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
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
                <div className="row">
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
                <div className="row">
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
                {/* buton cu verde pentru oferte active */}
                {currentUser?.role === "WORKER" ? (
                  <a
                    className="btn btn-primary font-weight-bold  mx-2  "
                    aria-current="page"
                    href={`/${currentUser?.id}/pending`}
                  >
                    Pending Ads
                  </a>
                ) : (
                  <a
                    className="btn btn-primary font-weight-bold  mx-2  "
                    aria-current="page"
                    href={`/${currentUser?.id}/active`}
                  >
                    Active Ads
                  </a>
                )}

                <a
                  className="btn btn-secondary font-weight-bold  mx-2  "
                  aria-current="page"
                  href={`/${currentUser?.id}/finalised`}
                >
                  Completed Ads
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
