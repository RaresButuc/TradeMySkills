import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get("http://localhost:8080/category");
        const data = response.data;
        console.log(data)
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const writeAWordWithoutFullUppercase = (adCategory) => {
    return adCategory.charAt(0).toUpperCase() + adCategory.slice(1).toLowerCase();
  };

  return (
    <div className="container-xl">
      <div className="row" style={{ marginTop: 130 }}>
      <h1 className="fw-bold mb-5">
        Categories
      </h1>
        {categories&&categories.map((category, index) => (
          <div className="col" key={index}>
            <a href={`/all-ads/${category.nameOfCategory}`}>
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
