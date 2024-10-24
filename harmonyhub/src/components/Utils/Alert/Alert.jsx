import { forwardRef } from "react";

const Alert = forwardRef(function Alert({ message, handleClose }, ref) {
  return (
    <dialog ref={ref} className="">
      <div>{message}</div>
      <form
        method="dialog"
        className="font-bold text-right flex justify-end w-full "
      >
        <button onClick={handleClose}>Close</button>
      </form>
    </dialog>
  );
});

export default Alert;
