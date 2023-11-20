import { forwardRef } from "react";

const PriceInput = forwardRef(({ ad }, ref) => {
  return (
    <div className="input-group mb-4">
      <span className="input-group-text">EUR</span>
      <input
        ref={ref}
        type="text"
        className="form-control"
        aria-label="Amount (to the nearest dollar)"
        defaultValue={ad ? ad.price : ""}
      />
      <span className="input-group-text">.00</span>
    </div>
  );
});
export default PriceInput;
