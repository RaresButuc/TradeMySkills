import { forwardRef } from "react";
import MessageUnderInputs from "./MessageUnderInputs";

const TitleInput = forwardRef(({ message,ad }, ref) => {
  return (
    <div className="mb-3">
      <label htmlFor="Title" className="form-label">
        Title
      </label>
      <input
        ref={ref}
        className="form-control"
        id="Title"
        aria-describedby="Title-Help"
        defaultValue={ad ? ad.title : ""}
        />
      <MessageUnderInputs message={message} />
    </div>
  );
});

export default TitleInput;
