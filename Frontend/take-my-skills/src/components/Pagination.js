import { useState } from "react";
import changeLink from "../shared/utils";

export default function Pagination({ elements }) {
  const currentPageNumber = elements?.pageable.pageNumber + 1;

  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul class="pagination">
          <li class={`page-item ${elements?.first ? "disabled" : ""}`}>
            <a
              class="page-link"
              onClick={() => changeLink("pagenumber", currentPageNumber - 1)}
            >
              Previous
            </a>
          </li>
          {/* {elements &&
            elements.map((element, index) => (
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
            ))} */}

          <li class={`page-item ${elements?.last ? "disabled" : ""}`}>
            <a
              class="page-link"
              onClick={() => changeLink("pagenumber", currentPageNumber + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
