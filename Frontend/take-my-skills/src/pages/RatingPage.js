import { useParams } from "react-router-dom";
import { useState } from "react";
import Rating from "react-rating-stars-component";
import DefaultURL from "../GlobalVariables";
import axios from "axios";

export default function RatingPage() {
  const { from } = useParams();
  const { to } = useParams();
  const [newValue, setNewValue] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [comment, setComment] = useState("");

  const onChangeRating = (e) => {
    setNewValue(e);
    setButtonStatus(false);
  };

  const sendRating = async () => {
    try {
      await axios.post(`${DefaultURL}/ratings`, {
        star: newValue,
        comment: comment,
        from: { id: from },
        to: { id: to },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <div style={{ margin: 100, padding: 0 }}>
        <h1>Rate your experience on this project!</h1>
        <label htmlFor="Rating">Rate</label>
        <div className="container-xl d-flex justify-content-center">
          <Rating
            count={5}
            size={23}
            value={0}
            onChange={onChangeRating}
            edit={true}
            isHalf={true}
            id="Rating"
          />
        </div>
        <label htmlFor="Comment">Add a Comment</label>
        <textarea
          className="form-control"
          id="Comment"
          maxLength={250}
          style={{ height: 150 }}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            sendRating();
          }}
          disabled={buttonStatus}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
