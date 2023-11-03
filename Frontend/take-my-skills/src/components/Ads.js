import logoMap from "../photo/icons/MapPointer.png";
import logoMoney from "../photo/icons/PayMoney.png";

export default function Ads({ ads }) {
  const writeAWordWithoutFullUppercase = (adCategory) => {
    return (
      adCategory.charAt(0).toUpperCase() + adCategory.slice(1).toLowerCase()
    );
  };

  return (
    <div>
      <div className="container-xl ">
        <div className="row " >
          {ads &&
            ads.map((ad, index) => (
              <div
                className="card mt-4 col-xl-4 col-md-6 mx-auto"
                 style={{ width: "19rem" }}
                key={index}
              >
                <div className="card-header fw-bold">
                  {writeAWordWithoutFullUppercase(ad.typeOfAd.nameOfCategory)}
                </div>
                <div className="card-body ">
                  <a
                    className="h5 card-title mb-4 text-decoration-none col-12"
                    href={`/ad/${ad.id}`}
                  >
                    {ad.name}
                  </a>
                  <hr/>
                  {/* Interior Elements */}
                  <div className="container">
                    <div className="row">
                      <div className="">
                        <h5 className="card-title  fw-bold">
                          <img
                            src={logoMap}
                            alt="Location"
                            className="mb-1 ms-2"
                            style={{ width: 35 }}
                          />
                          <br></br>
                          {ad.location.nameOfTheCounty},
                          {ad.location.nameOfTheCity}
                        </h5>
                        <div className="mt-4">
                        <h5 className="card-title   fw-bold">
                          <img
                            src={logoMoney}
                            alt="Price"
                            className="mb-1"
                            style={{ width: 45 }}
                          />
                           <br></br>
                          {ad.price}
                        </h5>
                      </div>
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
