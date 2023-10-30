import { useSignIn } from "react-auth-kit";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/users/authenticate",
        values
      );
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email, role: response.data.role },
      });
      navigate("/login");
    } catch (err) {
      if (err instanceof AxiosError) setError(err.response?.data.message);
      else if (err instanceof Error) setError(err.message);
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
    <div className="row" style={{ marginTop: 130 }}>
      <h1>Login</h1>
      <form onSubmit={onSave}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
        <p>
          Not a member yet? <a href="/register">Register NOW</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
