import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const CategorySelect = forwardRef(({ ad }, ref) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/category");
        const data = response.data;
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="mb-4">
      <select className="form-select" aria-label="select category" ref={ref}>
        {!ad ? (
          <option disabled selected>
            Select category
          </option>
        ) : (
          <option selected disabled value={ad.typeOfAd.id}>{ad.typeOfAd.nameOfCategory}</option>
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
