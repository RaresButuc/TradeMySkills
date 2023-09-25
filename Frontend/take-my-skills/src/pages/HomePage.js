import videoBg from "../video/-60.1.mp4";
import countriesIcon from "../photo/icons/countries.png";
import professionalsIcon from "../photo/icons/businessman.png";
import customersIcon from "../photo/icons/customer-service.png";
import logoAdevarul from "../photo/logosPartners/adevarul.png";
import logoDigi from "../photo/logosPartners/digi-24.png";
import logoForbes from "../photo/logosPartners/forbes.png";
import logoHolcim from "../photo/logosPartners/holcim.png";
import logoLT from "../photo/logosPartners/L&T.png";
import logoObservator from "../photo/logosPartners/observator.png";
import logoProTV from "../photo/logosPartners/pro-tv.png";
import logoSG from "../photo/logosPartners/saint-gobain.png";
import logoTVR from "../photo/logosPartners/tvr.png";
import logoVisa from "../photo/logosPartners/visa.png";

export default function HomePage() {
  return (
    <>
      <div class=" text-bg-dark position-relative">
        <video className="card-img" src={videoBg} autoPlay loop muted />
        <div class="card-img-overlay m-auto position-absolute top-50 start-0">
          <h1 class="card-slogan fw-bold mb-3">
            Every Service Is NOW More Accesible Than Ever
          </h1>
          <a className="btn btn-primary fw-bold p-3">
            POST Your Ads NOW FOR FREE
          </a>
        </div>
      </div>
      <h1 className="achievements-title mb-5 mt-5 fw-bold">
        Achievements So Far..
      </h1>
      <div class="container text-center mb-5">
        <div class="row">
          <div class="col">
            <img src={countriesIcon} alt="Countries" className="w-50 pulse" />
            <h1 className="achievement-number fw-bold">3</h1>
            <h2>Countries</h2>
          </div>
          <div class="col">
            <img
              src={professionalsIcon}
              alt="Professionals"
              className="w-50 pulse"
            />
            <h1 className="achievement-number fw-bold">+9,000</h1>
            <h2>Professionals and Businesses</h2>
          </div>
          <div class="col">
            <img src={customersIcon} alt="Customers" className="w-50 pulse" />
            <h1 className="achievement-number fw-bold">+80,000</h1>
            <h2>Satisfied Clients</h2>
          </div>
        </div>
      </div>
      <div className=" bg-primary mt-2">
        <br />
        <br />
        <h1 className="mt-2 text-light fw-bold">Partners & Media:</h1>
        <img
          src={logoProTV}
          alt="Pro-TV"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoLT}
          alt="L&T"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoObservator}
          alt="Observator"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoHolcim}
          alt="Holcim"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoAdevarul}
          alt="Adevarul"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoSG}
          alt="Saint-Gobain"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoTVR}
          alt="TVR"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoForbes}
          alt="Forbes"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoVisa}
          alt="Visa"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
        <img
          src={logoDigi}
          alt="Digi-24"
          className="m-5 scaleHover"
          style={{ width: 120 }}
        />
      </div>
    </>
  );
}
