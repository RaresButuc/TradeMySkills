import Rating from "react-rating-stars-component";

export default function StarsRating({ userRating }) {
  console.log(userRating);
  return (
    <div style={{ margin: 0, padding: 0 }}> {/* Added styles to remove margins and padding */}
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
