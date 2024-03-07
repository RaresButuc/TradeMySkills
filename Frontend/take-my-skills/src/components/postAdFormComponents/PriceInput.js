import { forwardRef } from "react";

const inputStyles = `
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`;

const PriceInput = forwardRef(({ ad }, ref) => {
  return (
    <div>
      <style>{inputStyles}</style>

      <div className="input-group mb-4">
        <span className="input-group-text">EUR</span>
        <input
          ref={ref}
          type="number"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          defaultValue={ad ? ad.price : ""}
          required
        />
        <span className="input-group-text">.00</span>
      </div>
    </div>
  );
});

export default PriceInput;
