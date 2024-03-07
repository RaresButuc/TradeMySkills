import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useRef, useState, useEffect } from "react";

import Alert from "../components/Alert";
import DefaultURL from "../GlobalVariables";

export default function ChangePassword({ email, uuid }) {
  const isAuthenticated = useIsAuthenticated();

  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const [userInfos, setUserInfos] = useState("");
  const [active, setActive] = useState(false);

  const [uuidAvailable, setUUIDAvailable] = useState(false);
  const [uuidEmail, setUuidEmail] = useState("");

  const actualPassword = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();

  const navigate = useNavigate();

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
        console.log(err);
      }
    };

    const fetchUUIDRequest = async () => {
      try {
        const isUUIDAvailable = await axios.get(
          `${DefaultURL}/changepassword/valid/${uuid}`
        );
        const dataAvailable = isUUIDAvailable.data;

        setUUIDAvailable(dataAvailable);

        if (!dataAvailable) {
          const reqByUUID = await axios.get(
            `${DefaultURL}/changepassword/getemail/${uuid}`
          );
          setUuidEmail(reqByUUID.data);
        }
      } catch (err) {
        console.log(err);
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

        if (response.data.includes("Congratulations")) {
          setShowAlert(true);
          setAlertInfos(["success", response.data]);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setShowAlert(true);
          setAlertInfos(["danger", response.data]);

          setTimeout(() => {
            navigate("/forget-password");
          }, 3000);
        }
      } else {
        await axios.put(
          `http://localhost:8080/users/${userInfos?.id}/change-password`,
          {
            actualPassword: actualPassword.current.value,
            newPassword: newPassword.current.value,
          }
        );
        setTimeout(() => {
          navigate("/myprofile");
        }, 3000);
        setShowAlert(true);
        setAlertInfos(["success", "Password successfully changed!"]);
      }
    } catch (err) {
      setShowAlert(true);
      setAlertInfos([
        "danger",
        "Fields incorrectly completed! Try again carefully!",
      ]);
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
          This Page Was Available Only for 60 Minutes.
          <br />
          Please Demand a New Email Request from{" "}
          <a href="http://localhost:3000/forget-password">This Page</a>!
        </h1>
      )}
    </>
  );
}
