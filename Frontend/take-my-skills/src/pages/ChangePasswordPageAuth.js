import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import Alert from "../components/Alert";
import DefaultURL from "../GlobalVariables";

export default function ChangePasswordAuth() {
  const auth = useAuthUser();
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [userInfos, setUserInfos] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);

  const newPassword = useRef();
  const actualPassword = useRef();
  const confirmNewPassword = useRef();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log(auth);
      try {
        const response = await axios.get(
          `${DefaultURL}/users/email/${auth()?.email}`
        );
        const data = response.data;
        setUserInfos(data);
      } catch (err) {
        navigate("/error");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPasswordForm = formData.get("newPassword");

    try {
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
    } catch (err) {
      setShowAlert(true);
      setAlertInfos(["danger", err.response.data.message]);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const unlockSaveButton = () => {
    const newPassFieldValue = newPassword.current.value;
    const confirmPassFieldVaue = confirmNewPassword.current.value;

    setActive(
      newPassFieldValue === confirmPassFieldVaue && newPassFieldValue.length > 0
    );
  };

  return (
    <>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}
      <form onSubmit={handleSubmit} style={{ marginTop: 175 }}>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h1 className="mb-3">Change Password</h1>

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
                        *The Confirmation Password should be the same as the New
                        Password!
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
    </>
  );
}
