import React, { useState } from "react";

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
  let items = [
    "Construction",
    "Confections",
    "Cooking",
    "Delivery",
    "#Events",
    "Education",
    "Cleaning",
    "Petcare",
    "Babysitter",
    "OtherServices",
  ];

  let link = [
    "construction",
    "confections",
    "cooking",
    "delivery",
    "events",
    "education",
    "cleaning",
    "petcare",
    "babysitter",
    "other",
  ];

  return (
    <div className="container-xl">
      <div class="row" style={{ marginTop: 130 }}>
      <h1 className="fw-bold mb-5">
        Categories
      </h1>
        {items.map((item, index) => (
          <div class="col">
            <a href={`/all-offer/${link[index]}`}>
              <img
                src={photo[index]}
                alt="item"
                className="w-50 scaleHover rounded-circle scaleHover"
              />
            </a>
            <t>{item}</t>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListGroup;
