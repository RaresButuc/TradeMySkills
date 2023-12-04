import { useState, useEffect } from "react";
import DefaultURL from "../GlobalVariables";
import Rating from "react-rating-stars-component";
import axios from "axios";

export default function StarsRating({ userId }) {
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    if (userId) {
      const getTotalRating = async () => {
        try {
          const response = await axios.get(`${DefaultURL}/users/totalrating/${userId}`);
          const data = response.data;
          if (data !== null) {
            setCurrentRating(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getTotalRating();
    }
  }, [userId]);
  

  return (
    <div>
      <Rating
        count={5}
        size={24}
        value={currentRating}
        edit={false}
        isHalf={false}
      />
    </div>
  );
}
