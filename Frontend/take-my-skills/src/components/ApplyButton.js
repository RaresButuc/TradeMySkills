import Modal from "./Modal";

export default function ApplyButton({
  applyOrCancel,
  onClickFunction,
  buttonContent,
}) {
  return (
    <>
      <button
        className="container-xl col-2 mt-3"
        style={{
          backgroundColor: "#fa6900",
          color: "white",
          height: 60,
        }}
        data-bs-toggle="modal"
        data-bs-target={applyOrCancel ? "#cancelApplyModal" : "#applyModal"}
      >
        {buttonContent}
      </button>

      <Modal
        id={applyOrCancel ? "cancelApplyModal" : "applyModal"}
        ariaLabel={applyOrCancel ? "cancelApplyModalLabel" : "applyModalLabel"}
        message={
          applyOrCancel
            ? "Are you sure you want to cancel your partnership on this project? You will be able to apply to it again only with the consent of the owner."
            : "Are you sure you want to apply as the worker of this project?"
        }
        onClickFunction={onClickFunction}
        confirmButton={"Confirm"}
      />
    </>
  );
}
