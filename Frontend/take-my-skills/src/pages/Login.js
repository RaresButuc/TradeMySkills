import axios from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

import Alert from "../components/Alert";
import DefaultURL from "../GlobalVariables";

function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertInfos, setAlertInfos] = useState(["", ""]);

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${DefaultURL}/users/authenticate`,
        values
      );
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email, role: response.data.role },
      });
      navigate("/");
    } catch (err) {
      setShowAlert(true);
      setAlertInfos(["danger", err.response.data.message]);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const authenticateData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    onSubmit(authenticateData);
  };

  return (
    <div>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}
      <form onSubmit={onSave} style={{ marginTop: 175 }}>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h1 className="mb-3">Log In</h1>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>

                  <p className="mt-4">
                    Did you forget the password?{" "}
                    <a href="/forget-password">Change it NOW</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          Not a member yet? <a href="/register">Register NOW</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
