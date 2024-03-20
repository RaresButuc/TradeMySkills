import StarsRating from "./StarsRating";

export default function RatingCard({ userName, userId, rating }) {
  return (
    <div className="container-xl p-2 col-xxl-3  col-xl-4 col-xs-12 col-md-6 col-lg-6 mx-auto d-flex justify-content-center">
      <div class="card" style={{ width: "19rem", height: "320px" }}>
        <div class="card-body">
          <a href={`/profile/${userId}`} class="card-title h5">
            {userName}
          </a>
          <div className="container-xl d-flex justify-content-center ">
            <StarsRating userRating={rating?.star} />
          </div>
          <hr />
          <p class="card-text">{rating?.comment}</p>
        </div>
      </div>
    </div>
  );
}
