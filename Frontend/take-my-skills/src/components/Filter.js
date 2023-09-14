export default function Filter() {
  return (
    <div className="container-xl">
      <div class="input-group mb-3 mt-4">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort By:
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#">
              Name ↑
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Name ↓
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Price ↑
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Price ↓
            </a>
          </li>
        </ul>
        <input
          type="text"
          class="form-control"
          aria-label="Text input with dropdown button"
          placeholder="What are you looking for?"
        />
      </div>
    </div>
  );
}
