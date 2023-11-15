import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AdDetail() {
  const { id } = useParams();

  const [adInfos, setAdInfos] = useState(null);
  const [adLocation, setAdLocation] = useState(null);
  const [editOrSave, setEditOrSave] = useState(0);
  const [buttonValue, setButtonValue] = useState("Edit Ad");

  const adTitleRef = useRef("");
  const adDescriptionRef = useRef("");
  const adTypeOfAdRef = useRef("");
  const adPriceRef = useRef("");
  const adCountyRef = useRef("");
  const adCityRef = useRef("");

  const onSave = async () => {
    const editData = {
      title: adTitleRef.current.value,
      description: adDescriptionRef.current.value,
      typeOfAd: adTypeOfAdRef.current.value,
      price: adPriceRef,
      location: {
        nameOfTheCounty: adCountyRef.current.value,
        nameOfTheCity: adCityRef.current.value,
      },
    };
    try {
      await axios.put(`http://localhost:8080/ads/${id}`, editData);
    } catch (err) {
      console.log(err);
    }
  };

  const changeEdit = () => {
    if (editOrSave === 0) {
      setEditOrSave(1);
      setButtonValue("Save");
    } else {
      onSave();
      setEditOrSave(0);
      setButtonValue("Edit Profile");
      window.location.reload(false);
    }
  };

  useEffect(() => {
    const getAdById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ads/${id}`);
        const data = response.data;
        setAdInfos(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getLocationsOfAd = async (adLoc) => {
      try {
        const response = await axios.get(
          `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=RO&adminDistrict=${adLoc.location.nameOfTheCounty}&locality=${adLoc.location.nameOfTheCity}&maxResults=20&key=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu`
        );
        const data = response.data.resourceSets[0].resources[0].point;
        setAdLocation(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdById();
    getLocationsOfAd(adInfos);
  }, [adInfos]);

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
      <div className="row container-xl" style={{ marginTop: 110 }}>
        {/* Titlu */}
        <div className="card container-xl col-8">
          <div className="card-body">
            <h1>
              <h1>{adInfos?.title}</h1>
            </h1>
            <hr />
            <div
              className="mt-4 container-xl text-start"
              style={{ minHeight: "52vh" }}
            >
              <h5>{adInfos?.description}</h5>
            </div>
            {/* Div for Price and Status */}
            <div className="row">
              {/* Price */}
              <div
                className="card text-white bg-success container-xl col-3"
                style={{ height: 90 }}
              >
                <div className="card-header">Price</div>
                <div className="card-body">
                  <h5 className="card-title">{adInfos?.price}</h5>
                </div>
              </div>
              {/* Status */}
              <div
                className={`card text-white bg-${colorDependingOnStatus(
                  adInfos?.statusOfAd
                )} container-xl col-3`}
                style={{ height: 90 }}
              >
                <div className="card-header">Status</div>
                <div className="card-body">
                  <h5 className="card-title">{adInfos?.statusOfAd}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profil */}
        <div className="container-xl col-4">
          <div className="card">
            <div className="card-body text-center">
              <a
                href={`/profile/${adInfos?.users[0].id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
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
                <h5 className="my-3">{adInfos?.users[0].name}</h5>
              </a>
              <p className="text-muted mb-1">{adInfos?.users[0].role}</p>
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

          <iframe
            className="mt-4"
            width="400"
            height="300"
            src={`https://www.bing.com/maps/embed/viewer.aspx?v=3&cp=${adLocation?.coordinates[0]}~${adLocation?.coordinates[1]}&lvl=12&w=400&h=300&credentials=AtF5j2AdfXHCqsoqmusG2zXRg7bFR63MIkoMe2EsRAgYfeslufM4-NNWkrfPmywu&form=BMEMJS`}
            frameborder="0"
          ></iframe>
          <h3>
            {adInfos?.location.nameOfTheCounty},
            {adInfos?.location.nameOfTheCity}
          </h3>
        </div>
      </div>
    </div>
  );
}
