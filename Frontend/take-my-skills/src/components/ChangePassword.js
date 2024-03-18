import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useRef, useState, useEffect } from "react";

import Alert from "../components/Alert";
import DefaultURL from "../GlobalVariables";

export default function ChangePassword({ email, uuid }) {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const [active, setActive] = useState(false);
  const [userInfos, setUserInfos] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);

  const [uuidEmail, setUuidEmail] = useState("");
  const [uuidAvailable, setUUIDAvailable] = useState(false);

  const newPassword = useRef();
  const actualPassword = useRef();
  const confirmNewPassword = useRef();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(
            `${DefaultURL}/users/email/${email}`
          );
          const data = response.data;
          setUserInfos(data);
        }
      } catch (err) {
        if (!isAuthenticated) {
          navigate("/error");
        }
      }
    };

    const fetchUUIDRequest = async () => {
      try {
        const isUUIDAvailableByTime = await axios.get(
          `${DefaultURL}/changepassword/isTimeExpired/${uuid}`
        );
        const isUUIDAvailable = await axios.get(
          `${DefaultURL}/changepassword/isRequestExpired/${uuid}`
        );

        const dataAvailableByTime = isUUIDAvailableByTime.data;
        const dataAvailable = isUUIDAvailable.data;

        setUUIDAvailable(dataAvailable);

        if (!dataAvailableByTime && !dataAvailable) {
          const reqByUUID = await axios.get(
            `${DefaultURL}/changepassword/getEmail/${uuid}`
          );
          setUuidEmail(reqByUUID.data);
        }
      } catch (err) {
        if (!isAuthenticated) {
          navigate("/error");
        }
      }
    };

    fetchCurrentUser();
    fetchUUIDRequest();
  }, []);

  const unlockSaveButton = () => {
    const newPassFieldValue = newPassword.current.value;
    const confirmPassFieldVaue = confirmNewPassword.current.value;

    setActive(
      newPassFieldValue === confirmPassFieldVaue && newPassFieldValue.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPasswordForm = formData.get("newPassword");

    try {
      if (!isAuthenticated()) {
        const response = await axios.put(
          `http://localhost:8080/users/set-password?email=${uuidEmail}&uuid=${uuid}`,
          {},
          {
            headers: {
              newPassword: newPasswordForm,
            },
          }
        );

        setShowAlert(true);
        setAlertInfos(["success", response.data]);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const response = await axios.put(
          `http://localhost:8080/users/${userInfos?.id}/change-password`,
          {
            actualPassword: actualPassword.current.value,
            newPassword: newPassword.current.value,
          }
        );
        setTimeout(() => {
          navigate(`/profile/${userInfos?.id}`);
        }, 3000);
        setShowAlert(true);
        setAlertInfos(["success", response.data]);
      }
    } catch (err) {
      setShowAlert(true);
      setAlertInfos(["danger", err.response.data.message]);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}
      {!uuidAvailable ? (
        <form onSubmit={handleSubmit} style={{ marginTop: 175 }}>
          <div className="container py-3 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-5 text-center">
                    <h1 className="mb-3">Change Password</h1>
                    {isAuthenticated() ? (
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          className="form-control"
                          id="actualPassword"
                          name="actualPassword"
                          ref={actualPassword}
                          placeholder="Actual Password"
                        />
                      </div>
                    ) : null}
                    <div className="form-outline mb-4">
                      <input
                        onChange={() => unlockSaveButton()}
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        ref={newPassword}
                        placeholder="New Passoword"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        onChange={() => unlockSaveButton()}
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        ref={confirmNewPassword}
                        placeholder="Confirm New Passoword"
                      />
                    </div>
                    {active === true ? (
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                      >
                        Save
                      </button>
                    ) : (
                      <div>
                        <div
                          id="Title-Help"
                          className="form-text"
                          style={{ color: "#fa6900" }}
                        >
                          *The Confirmation Password should be the same as the
                          New Password!
                        </div>

                        <button
                          className="btn btn-primary btn-lg btn-block mt-3"
                          type="submit"
                          disabled
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <h1 className="container-xl position-absolute top-50 start-50 translate-middle">
          This Page Is Not Available Anymore!
          <br />
          Please Demand a New Email Request From{" "}
          <a href="http://localhost:3000/forget-password">This Page</a>!
        </h1>
      )}
    </>
  );
}
