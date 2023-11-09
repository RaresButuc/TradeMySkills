import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
export default function ChangePassword() {
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const navigate = useNavigate();
  const { email } = useParams();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const [active, setActive] = useState(false);

  const unlockSaveButton = () => {
    if (
      newPassword.current.value === confirmNewPassword.current.value &&
      newPassword.current.value.length > 0
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  console.log(email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPasswordForm = formData.get("password");

    try {
      console.log(email);
      console.log(newPasswordForm);
      const response = await axios.put(
        `http://localhost:8080/users/set-password?email=${email}`,
        {},
        {
          headers: {
            newPassword: newPasswordForm,
          },
        }
      );
      console.log(response.status);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setShowAlert(true);
      setAlertInfos(["success", "Password successfully changed!"]);
    } catch (err) {
      if (err instanceof AxiosError) setError(err.response?.data.message);
      else if (err instanceof Error) setError(err.message);
    }
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
                      onChange={() => unlockSaveButton()}
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      ref={newPassword}
                      placeholder="New Passowrd"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      onChange={() => unlockSaveButton()}
                      type="password"
                      className="form-control"
                      id="confirm-password"
                      name="confirm-password"
                      ref={confirmNewPassword}
                      placeholder="Confirm New Passowrd"
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
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                      disabled
                    >
                      Save
                    </button>
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
