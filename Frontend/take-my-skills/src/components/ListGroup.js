import React, { useState } from "react";
import icong_dom from "../photo/icons/icong-dom.jpg"

const ListGroup = () => {
    let items = ["Construction",
        "Confections",
        "Cooking",
        "Delivery",
        "#Events",
        "Education",
        "Cleaning",
        "Petcare",
        "Babysitter",
        "OtherServices",]

        let link = ["construction",
        "confections",
        "cooking",
        "delivery",
        "events",
        "education",
        "cleaning",
        "petcare",
        "babysitter",
        "other"]


    return (
    
        <div className="container-xl">
            <div class="row" style={{marginTop : 150}}>
            {items.map((item,index) => (
                              <div class="col" >
                                <a href={`/all-offer/${link[index]}`}>
                              <img src={icong_dom} alt="Countries" className="w-50 rounded-circle scaleHover" />
                              </a>
                              <t >{item}</t>
                              </div>
                ))}
            </div>

<p>asd</p>
        </div>


        
    );
};

export default ListGroup;
