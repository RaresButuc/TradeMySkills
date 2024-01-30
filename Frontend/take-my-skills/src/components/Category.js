import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import changeLink from "../shared/utils";
import DefaultURL from "../GlobalVariables";
import writeAWordWithoutFullUppercase from "../shared/WordUppercase";
import construction from "../photo/icons/Construction.png";
import confections from "../photo/icons/Confections.png";
import cooking from "../photo/icons/Cooking.png";
import delivery from "../photo/icons/Transport.png";
import events from "../photo/icons/Event.png";
import education from "../photo/icons/Education.png";
import cleaning from "../photo/icons/Cleaning.png";
import petcare from "../photo/icons/PetCare.png";
import babysitter from "../photo/icons/BabySitting.png";
import other from "../photo/icons/Others.png";

const ListGroup = () => {
  //TO-DO: API pentru poze
  let photo = [
    construction,
    confections,
    cooking,
    delivery,
    events,
    education,
    cleaning,
    petcare,
    babysitter,
    other,
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${DefaultURL}/category`);
        const data = response.data;
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);



  return (
    <div className="container-xl">
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: 110 }}
      >
        <h1 className="fw-bold mb-5">Categories</h1>
        {categories &&
          categories.map((category, index) => (
            <div className="col-xl-1 col-md-2 col-sm-3 col-6" key={index}>
              <a
                onClick={() => changeLink("category", category.nameOfCategory)}
              >
                <img
                  src={photo[index]}
                  alt="item"
                  className="w-50 scaleHover rounded-circle scaleHover"
                />
              </a>
              <p>{writeAWordWithoutFullUppercase(category.nameOfCategory)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListGroup;
