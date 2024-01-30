import logoMap from "../photo/icons/MapPointer.png";
import logoMoney from "../photo/icons/PayMoney.png";
import writeAWordWithoutFullUppercase from "../shared/WordUppercase"

export default function Ads({ ads }) {
  
  const colorAdDependingOnCategory = (ad) => {
    switch (ad.typeOfAd.nameOfCategory) {
      case "constructions": {
        return "#008081";
      }
      case "confections": {
        return "#ff7f50";
      }
      case "cooking": {
        return "#ffdf01";
      }
      case "deliveries": {
        return "#708090";
      }
      case "events": {
        return "#dfc5fe";
      }
      case "education": {
        return "#eb9d76";
      }
      case "cleaning": {
        return "#61c29e";
      }
      case "petcare": {
        return "#ffa22e";
      }
      case "babysitting": {
        return "#9c9cce";
      }
      case "other": {
        return "#ffb3c6";
      }
    }
  };

  return (
    <div>
      <div className="container-xl">
        <div className="row ">
          {ads &&
            ads.map((ad, index) => (
              <div
                className="card mt-4 col-xl-4 col-md-6 mx-auto"
                style={{ width: "19rem" }}
                key={index}
              >
                <div
                  className="card-header fw-bold"
                  style={{
                    backgroundColor: colorAdDependingOnCategory(ad),
                    color: "white",
                  }}
                >
                  {writeAWordWithoutFullUppercase(ad.typeOfAd.nameOfCategory)}
                </div>
                <div className="card-body ">
                  <a
                    className="h5 card-title text-decoration-none col-12"
                    href={`/ad/${ad.id}`}
                  >
                    {ad.title}
                  </a>
                  <hr />
                  {/* Interior Elements */}
                  <div className="container">
                    <div className="row">
                      <div>
                        <h5 className="card-title fw-bold">
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
                          <h5 className="card-title fw-bold">
                            <img
                              src={logoMoney}
                              alt="Price"
                              className="mb-1"
                              style={{ width: 35 }}
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
