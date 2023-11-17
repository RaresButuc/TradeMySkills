import { forwardRef } from "react";

const CategorySelect = forwardRef(({ newOrEdit, allCategories, ad }, ref) => {
  const categoriesToShow = newOrEdit
    ? allCategories
    : allCategories.filter(
        (e) => e.nameOfCategory !== ad.typeOfAd.nameOfCategory
      );

  return (
    <div className="mb-4">
      <select className="form-select" aria-label="select category" ref={ref}>
        {newOrEdit ? (
          <option disabled selected>
            Select category
          </option>
        ) : (
          <option selected>{ad.typeOfAd.nameOfCategory}</option>
        )}
        {categoriesToShow &&
          categoriesToShow.map((category, index) => (
            <option value={category.id} key={index}>
              {category.nameOfCategory}
            </option>
          ))}
      </select>
    </div>
  );
});
export default CategorySelect;
