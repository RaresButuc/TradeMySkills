import React, { useState } from "react";

const ListGroup = () => {
    let items = ["Construction",
        "Confections",
        "Cooking",
        "Delivery",
        "Events",
        "Education",
        "Cleaning",
        "Petcare",
        "Babysitter",
        "Other",]

        let [selectedIndex,setSelectedIndex] = useState(-1);

    return (
        <div>
            <h1>Sort by</h1>
                {items.map((item,index) => (
                    <li className= {selectedIndex === index ? "list-group-item active" : "list-group-item"} key={item} onClick={()=>setSelectedIndex(index)}> {item} </li>
                ))}
        </div>
    );
};

export default ListGroup;
