import { useEffect } from "react";
import { useState, useRef } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TitleInput from "./postAdFormComponents/TitleInput";
import DescriptionInput from "./postAdFormComponents/DescriptionInput";
import PriceInput from "./postAdFormComponents/PriceInput";
import CategorySelect from "./postAdFormComponents/CategorySelect";
import LocationSelects from "./postAdFormComponents/LocationSelects";
import DefaultURL from "../GlobalVariables";
import Alert from "../components/Alert";

export default function FormAddNewAd() {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const [countyChosenFullName, setCountyChosenFullName] = useState("");
  const [charactersTextArea, setCharactersTextArea] = useState(0);
  const [alertInfos, setAlertInfos] = useState(["", ""]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const titleOfAd = useRef("");
  const descriptonOfAd = useRef("");
  const categoryOfAd = useRef("");
  const priceOfAd = useRef(0);
  const cityChosen = useRef("");
  const countyChosenAbrev = useRef("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${DefaultURL}/users/email/${auth().email}`
        );
        const data = response.data;
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);

  const postNewAd = async (
    titleAd,
    descriptionAd,
    categoryAd,
    priceAd,
    countyAd,
    cityAd
  ) => {
    try {
      if (
        titleAd !== "" &&
        descriptionAd !== "" &&
        categoryAd !== "" &&
        priceAd !== "" &&
        countyAd !== "" &&
        cityAd !== ""
      ) {
        const response = await axios.post(`${DefaultURL}/ads`, {
          title: titleAd,
          description: descriptionAd,
          typeOfAd: { id: categoryAd },
          price: priceAd,
          owner: { id: currentUser.id },
          location: { nameOfTheCounty: countyAd, nameOfTheCity: cityAd },
        });

        if (response.status === 200) {
          setShowAlert(true);
          setAlertInfos(["success", "Your Ad was Succesfully Posted!"]);
          setTimeout(() => {
            navigate("/all-ads");
          }, 3000);
        } else {
          console.error(`HTTP Error: ${response.status}`);
          const data = await response.json();
          console.error(data);
        }
      } else {
        setShowAlert(true);
        setAlertInfos(["danger", "All Fields Must be Completed!"]);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const countingCharactersDescription = (e) => {
    setCharactersTextArea(e.target.value.length);
  };

  return (
    <div>
      {showAlert && <Alert type={alertInfos[0]} message={alertInfos[1]} />}
      <form style={{ marginTop: 95 }}>
        <div className="container-xl">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h1 className="mb-3">Post A New Ad</h1>
                  <hr />

                  <TitleInput
                    message={"Choose a short and suggestive title"}
                    ad={null}
                    ref={titleOfAd}
                  />

                  <DescriptionInput
                    ad={null}
                    countingCharactersDescription={
                      countingCharactersDescription
                    }
                    message={charactersTextArea + "/ 1000"}
                    ref={descriptonOfAd}
                  />

                  <CategorySelect ref={categoryOfAd} ad={null} />

                  <PriceInput ad={null} ref={priceOfAd} />

                  <LocationSelects
                    refCity={cityChosen}
                    refCounty={countyChosenAbrev}
                    ref={null}
                    countyFullName={(countyName) => {
                      setCountyChosenFullName(countyName);
                    }}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      postNewAd(
                        titleOfAd.current.value,
                        descriptonOfAd.current.value,
                        categoryOfAd.current.value,
                        priceOfAd.current.value,
                        countyChosenFullName,
                        cityChosen.current.value
                      );
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
