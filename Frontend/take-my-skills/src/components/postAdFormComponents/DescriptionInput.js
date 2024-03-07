import { forwardRef } from "react";

import MessageUnderInputs from "./MessageUnderInputs";

const DescriptionInput = forwardRef(
  ({ ad, countingCharactersDescription, message }, ref) => {
    return (
      <div className="mb-3">
        <label
          htmlFor="description"
          className="form-label fw-bold text-decoration-underline"
        >
          Description
        </label>
        <textarea
          ref={ref}
          className="form-control"
          id="description"
          maxLength={1000}
          style={{ height: 150 }}
          defaultValue={ad ? ad.description : ""}
          onChange={countingCharactersDescription}
        />
        <MessageUnderInputs message={message} />
      </div>
    );
  }
);

export default DescriptionInput;
