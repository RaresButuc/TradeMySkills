import logoMap from "../photo/icons/MapPointer.png";
import logoMoney from "../photo/icons/PayMoney.png";


export default function Ads() {
  let names = [
    "Zidar",
    "Cofetar",
    "Doctor",
    "Zidar",
    "Cofetar",
    "Doctor",
    "Cofetar",
    "Doctor",
    ,
    "Cofetar",
    "Doctor",
  ];
  let descriptions = [
    "Caut zidar",
    "Caut Cofetar",
    "Caut Ginecolog",
    "Caut zidar",
    "Caut Cofetar",
    "Caut Ginecolog",
  ];
  let prices = [100, 200, 300, 100, 200, 300];
  let typeOfAds = [
    "Construction",
    "Confections",
    "Other",
    "Construction",
    "Confections",
    "Other",
  ];
  let locations = [
    "Tulcea",
    "Constanta",
    "Buzau",
    "Tulcea",
    "Constanta",
    "Buzau",
  ];

  return (
    <div>
      <div className="container-xl">
        <div className="row">
          {names.map((name, index) => (
            <div class="card mt-4 col-md-3 mx-auto" style={{ width: "18rem" }}>
              <div class="card-header fw-bold">{typeOfAds[index]}</div>
              <div class="card-body">
                <a class="h5 card-title mb-4 text-decoration-none" href="***">{name}</a>
                {/* Interior Elements */}
                <div class="container">
                  <div class="row">
                    <div class="col-sm">
                      <h5 class="card-title text-start fw-bold">
                      <img src={logoMap} alt="Location" className="mb-1 ms-2" style={{width : 45}} />
                        {locations[index]}
                      </h5>
                    </div>
                    <div class="col-sm">
                      <h5 class="card-title text-end  fw-bold">
                      <img src={logoMoney} alt="Price" className="mb-1" style={{width : 45}} /><br></br>
                        {prices[index]}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
