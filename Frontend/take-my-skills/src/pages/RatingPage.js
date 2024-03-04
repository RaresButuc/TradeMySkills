import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import Rating from "react-rating-stars-component";
import DefaultURL from "../GlobalVariables";
import axios from "axios";
import Alert from "../components/Alert";

export default function RatingPage() {
  const { to } = useParams();
  const auth = useAuthUser();

  const [stars, setStars] = useState(0);
  const [submitButtonStatus, setSubmitButtonStatus] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [comment, setComment] = useState("");
  const [userToBeRated, setUserToBeRated] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserToBeRated = async () => {
      try {
        const response = await axios.get(`${DefaultURL}/users/${to}`);
        setUserToBeRated(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${DefaultURL}/users/email/${auth()?.email}`
        );
        const data = await response.data;
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
    fetchUserToBeRated();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRating();
    setShowAlert(true);
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
      await axios.post(`${DefaultURL}/ratings`, {
        star: stars,
        comment: comment,
        from: { id: currentUser?.id },
        to: { id: to },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert type="success" message="You have succesfully send rating!" />
      )}
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
                    Write a short opinion (optional)
                  </label>
                  <textarea
                    className="form-control mb-4"
                    id="Comment"
                    maxLength={250}
                    style={{ height: 150 }}
                    onChange={(e) => setComment(e.target.value)}
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
    </div>
  );
}
