import StarsRating from "./StarsRating";

export default function RatingCard() {
  return (
    <div className="container-xl p-2 col-xxl-3  col-xl-4 col-xs-12 col-md-6 col-lg-6 mx-auto d-flex justify-content-center">
      <div class="card" style={{ width: "19rem", height: "320px" }}>
        <div class="card-body">
          <h5 class="card-title">Nume</h5>
          <div className="container-xl d-flex justify-content-center ">
            <StarsRating userRating="5" />
          </div>
          <hr />
          <p class="card-text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis
          </p>
        </div>
      </div>
    </div>
  );
}
