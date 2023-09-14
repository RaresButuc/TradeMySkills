export default function Ads() {
  let names = ["Zidar", "Cofetar", "Doctor","Zidar", "Cofetar", "Doctor", "Cofetar", "Doctor",, "Cofetar", "Doctor"];
  let descriptions = ["Caut zidar", "Caut Cofetar", "Caut Ginecolog","Caut zidar", "Caut Cofetar", "Caut Ginecolog"];
  let prices = [100, 200, 300,100, 200, 300];
  let typeOfAds = ["Construction", "Confections", "Other","Construction", "Confections", "Other"];
  let locations = ["Tulcea", "Constanta", "Buzau","Tulcea", "Constanta", "Buzau"];

  return (
    <div className="container-xl">
        <div className="row">
            {names.map((name, index) => (
        <div class="card mt-4 col-md-3 mx-auto" style={{width: "18rem"}}>
          <div class="card-header fw-bold">{typeOfAds[index]}</div>
          <div class="card-body">
            <h5 class="card-title">{name}</h5>
            {/* Interior Elements */}
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <h5 class="card-title text-start fw-bold">Location: {locations[index]}</h5>
                </div>
                <div class="col-sm">
                  <h5 class="card-title text-end  fw-bold">Price: {prices[index]}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
        </div>
      
    </div>
  );
}
