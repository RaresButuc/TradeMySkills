import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AdDetail() {
  const { id } = useParams();
  const [adInfos, setAdInfos] = useState(null);

  useEffect(() => {
    const getAdById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ads/${id}`);
        const data = response.data;
        console.log(data);
        setAdInfos(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdById();
  }, []);

  const colorDependingOnStatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return "primary";
      case "PENDING":
        return "warning";
      case "FINALISED":
        return "dark";
    }
  };

  return (
    <div className="container-xl">
      <div className="row container-xl" style={{ marginTop: 130 }}>
        {/* Titlu */}
        <div class="card container-xl col-8">
          <div class="card-body">
            <h1>
              <h1>{adInfos?.name}</h1>
            </h1>
            <hr />
            <div class="mt-4 container-xl text-start">
              <h5>{adInfos?.description}</h5>
            </div>
            {/* Div for Price and Status */}
            <div className="row mt-5">
              {/* Price */}
              <div
                class="card text-white bg-success container-xl col-3"
                style={{ height: 90 }}
              >
                <div className="card-header">Price</div>
                <div class="card-body">
                  <h5 class="card-title">{adInfos?.price}</h5>
                </div>
              </div>
              {/* Status */}
              <div
                className={`card text-white bg-${colorDependingOnStatus(
                  adInfos?.statusOfAd
                )} container-xl col-3`}
                style={{ height: 90 }}
              >
                <div class="card-header">Status</div>
                <div class="card-body">
                  <h5 class="card-title">{adInfos?.statusOfAd}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profil */}
        <div className="container-xl col-4">
          <div className="card">
            <div className="card-body text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>

              <h5 className="my-3">{adInfos?.user.name}</h5>
              <p className="text-muted mb-1">{adInfos?.user.role}</p>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              />

              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <div className="d-flex justify-content-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
