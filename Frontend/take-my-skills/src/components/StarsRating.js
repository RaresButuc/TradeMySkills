import Rating from "react-rating-stars-component";

export default function StarsRating({ userRating }) {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      {userRating >= 0 ? (
        <div className="container-xl d-flex justify-content-center">
          <Rating
            count={5}
            size={23}
            value={userRating}
            edit={false}
            isHalf={true}
          />
        </div>
      ) : null}
    </div>
  );
}
