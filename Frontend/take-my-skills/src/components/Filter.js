import React, { useState } from "react";
import changeLink from "../shared/utils";
export default function Filter() {
  const [change, setLink] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
            <a className="dropdown-item" onClick={() => changeLink("sort","name-asc")}>
              Name ↑
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => changeLink("sort","name-desc")}
            >
              Name ↓
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => changeLink("sort","price-asc")}
            >
              Price ↑
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => changeLink("sort","price-desc")}
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
          onChange={e => setInputValue(e.target.value.toLocaleLowerCase())}
        />
        {/* Nou */}
        <button
          type="button"
          className="btn btn-primary font-weight-bold  mx-2"
          onClick={() => changeLink("input",inputValue)}
        >
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
