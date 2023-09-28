import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
export default function FormAddNewAd(){

    const [categories, setCategories] = useState([]);
    const [citys, setCitys] = useState([]);
    const [countys, setCountys] = useState([]);
    const [citysAbreviation,setCitysAbreviation] = useState("");
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8080/category");
          const data = response.data;
          console.log(data);
          setCategories(data);
        } catch (err) {
          console.log(err);
        }
      };


      const fetchCity = async () => {
        try {
          const response = await axios.get("https://roloca.coldfuse.io/judete");
          const data = response.data;
          console.log(data);
          setCitys(data);
        } catch (err) {
          console.log(err);
        }
      };
    //   const fetchCountys = async (city) => {
    //     try {
    //       const response = await axios.get(`https://roloca.coldfuse.io/judete/${city}`);
    //       const data = response.data;
    //       console.log(data);
    //       setCountys(data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };


      fetchCategories();
      fetchCity();
    //   if(citysAbreviation!=""){
    //     fetchCountys(citysAbreviation);
    //   }
     
 
 
    }, []);

    // const handleSelectCity = (city) =>{
    //     setCitysAbreviation(city) ;
    // }

    return(
        <div className="container-xl" style={{ marginTop: 130 }} >
        <form >
  <div class="mb-3">
    <label for="Title" class="form-label">Title</label>
    <input  class="form-control" id="Title" aria-describedby="Title-Help" />
    <div id="Title-Help" class="form-text">
Choose a short and suggestive title</div>
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input class="form-control" id="description" style={{height: 150}}/>
  </div>
  <div class="mb-3">
  <select class="form-select" aria-label="select category">
  <option disabled selected>Select category </option>
  {categories &&
          categories.map((category, index) => (
            <option value={index}>{category.nameOfCategory}</option>
          ))}
</select>
</div>


<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"/>
  <span class="input-group-text">.00</span>
</div>



  <div class="mb-3">
  <select class="form-select" aria-label="select category">
  <option disabled selected>Select city </option>
  {citys &&
          citys.map((city, index) => (
            <option  value={index}>{city.nume}</option>
          ))}
</select>
</div>

<div class="mb-3">
  <select class="form-select" aria-label="select category">
  <option disabled selected>Select county </option>
  {countys &&
          countys.map((county, index) => (
            <option value={index}>{county}</option>
          ))}
</select>
</div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
    )
}