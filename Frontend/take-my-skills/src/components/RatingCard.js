import Rating from "react-rating-stars-component";

export default function RatingCard() {
  return (
    <div className="container-xl p-2 col-xxl-3  col-xl-4 col-xs-12 col-md-6 col-lg-6 mx-auto d-flex justify-content-center">
      <div class="card" style={{ width: "19rem" }}>
        <div class="card-body">
          <h5 class="card-title">Nume</h5>
          <p class="card-text">
            Esti forta
            tarasssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssse
          </p>
          <div className="container-xl d-flex justify-content-center">
            <Rating count={5} size={23} value={4} edit={false} isHalf={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
