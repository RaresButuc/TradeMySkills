import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import DefaultURL from "../GlobalVariables";

export default function ForgetPassword() {
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");

    try {
      const response = await axios.put(
        `${DefaultURL}/users/forget-password?email=${email}`
      );
      console.log(response.status);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      setShowAlert(true);
      setAlertInfos(["success", "Forget password form email was send!"]);
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status === 500) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
        setShowAlert(true);
        setAlertInfos(["danger", "No email was found!"]);
      }
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
                  <h1 className="mb-3">Forget Password</h1>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Send mail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
