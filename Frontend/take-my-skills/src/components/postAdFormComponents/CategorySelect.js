import axios from "axios";
import { forwardRef, useEffect, useState } from "react";

import DefaultURL from "../../GlobalVariables";
import firstLetterUppercase from "../../shared/FirstLetterUppercase";

const CategorySelect = forwardRef(({ ad }, ref) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${DefaultURL}/category`);
        const data = response.data;

        setCategories(
          data.map(
            (e) =>
              (e = {
                id: e.id,
                nameOfCategory: firstLetterUppercase(e.nameOfCategory),
              })
          )
        );
      } catch (err) {
        setCategories(null);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="mb-4">
      <select className="form-select" aria-label="select category" ref={ref}>
        {!ad ? (
          <option disabled selected value={""}>
            {categories
              ? "Select Category"
              : "No Categories Available! Try Again Later!"}
          </option>
        ) : (
          <option selected disabled value={ad.typeOfAd.id}>
            {firstLetterUppercase(ad.typeOfAd.nameOfCategory)}
          </option>
        )}
        {categories &&
          categories.map((category, index) => (
            <option value={category.id} key={index}>
              {category.nameOfCategory}
            </option>
          ))}
      </select>
    </div>
  );
});
export default CategorySelect;
