export default function Filter() {
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
            <a className="dropdown-item" href="#">
              Name ↑
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Name ↓
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Price ↑
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
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
      </div>
    </div>
  );
}
