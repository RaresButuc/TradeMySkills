import React, { useState } from "react";

export default function Filter() {
  const [change, setLink] = useState([]);

  const changeLink = (link) => {
    const currentUrl = new URL(window.location.href);

    // Update the sorting parameter
    currentUrl.searchParams.set("sort", link);

    // Set the updated URL
    window.location.href = currentUrl.toString();
  };

  return (
    <div className="container-xl">
      <div className="input-group mb-3 mt-4">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort By:
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" onClick={() => changeLink("name-asc")}>
              Name ↑
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => changeLink("name-desc")}
            >
              Name ↓
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => changeLink("price-asc")}
            >
              Price ↑
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => changeLink("price-desc")}
            >
              Price ↓
            </a>
          </li>
        </ul>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          placeholder="What are you looking for?"
        />
        {/* Nou */}
        <button type="button" class="btn btn-primary font-weight-bold  mx-2">
          Search
        </button>
      </div>
      {/* Nou */}
      
    {/* <div class="input-group container-fluid w-50">
        <span class="input-group-text">Min. Price</span>
        <input type="text" aria-label="First name" class="form-control" />
        <span class="input-group-text">Max. Price</span>
        <input type="text" aria-label="Last name" class="form-control" />
      </div> */}
      </div>
  );
}
