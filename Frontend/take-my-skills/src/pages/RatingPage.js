import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating-stars-component";

import Alert from "../components/Alert";
import ErrorPage from "../pages/ErrorPage";
import DefaultURL from "../GlobalVariables";

export default function RatingPage() {
  const { to } = useParams();
  const auth = useAuthUser();

  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const [userToBeRated, setUserToBeRated] = useState("");
  const [isRatedExistent, setIsRatedExistent] = useState(false);
  const [submitButtonStatus, setSubmitButtonStatus] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserToBeRated = async () => {
      try {
        const response = await axios.get(`${DefaultURL}/users/${to}`);
        setUserToBeRated(response.data);
      } catch (err) {
        navigate("/error");
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const responseCurrentUser = await axios.get(
          `${DefaultURL}/users/email/${auth()?.email}`
        );
        const dataCurrentUser = responseCurrentUser.data;

        const responseIsRatedExistent = await axios.get(
          `${DefaultURL}/ratings/${dataCurrentUser.id}/${to}`
        );
        const dataIsRatedExistent = responseIsRatedExistent.data;

        setCurrentUser(dataCurrentUser);
        setIsRatedExistent(dataIsRatedExistent);
      } catch (err) {
        navigate("/error");
      }
    };

    fetchCurrentUser();
    fetchUserToBeRated();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRating();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const onChangeRating = (e) => {
    setStars(e);
    setSubmitButtonStatus(false);
  };

  const sendRating = async () => {
    try {
      const response = await axios.post(`${DefaultURL}/ratings`, {
        star: stars,
        comment: comment,
        from: { id: currentUser?.id },
        to: { id: to },
      });

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

  return (
    <div>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}
      {!isRatedExistent ? (
        <>
          <form>
            <div className="container-xl" style={{ marginTop: 125 }}>
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong">
                    <div className="card-body p-4 text-center">
                      <h1>Rate Your Experience on this Project!</h1>
                      <hr />
                      <label
                        htmlFor="Rating"
                        className="form-label fw-bold text-decoration-underline mt-4"
                      >
                        Rate{" "}
                        <a href={`/profile/${userToBeRated?.id}`}>
                          {userToBeRated?.name}
                        </a>{" "}
                        as a {userToBeRated?.role?.substring(5)}
                      </label>
                      <div className="container-xl d-flex justify-content-center mb-4">
                        <Rating
                          count={5}
                          size={43}
                          value={0}
                          onChange={onChangeRating}
                          edit={true}
                          isHalf={true}
                          id="Rating"
                        />
                      </div>
                      <label
                        htmlFor="Comment"
                        className="form-label fw-bold text-decoration-underline"
                      >
                        Write a short opinion!
                      </label>
                      <textarea
                        className="form-control mb-4"
                        id="Comment"
                        maxLength={250}
                        style={{ height: 150 }}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={submitButtonStatus}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
