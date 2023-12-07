export default function Modal({
  id,
  ariaLabel,
  message,
  onClickFunction,
  confirmButton,
}) {
  return (
    <div
      className="modal fade"
      id={id}
      tabindex="-1"
      aria-labelledby={ariaLabel}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={ariaLabel}>
              Important!
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickFunction}
              data-bs-dismiss="modal"
            >
              {confirmButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
