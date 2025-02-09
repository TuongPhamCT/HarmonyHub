import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

const Alert = forwardRef(({ message }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    async showDialog() {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 6000); // Hide the alert after 6 seconds
    },
  }));

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed top-5 left-0 right-0 mx-auto flex items-center justify-center z-50 ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded shadow-lg">
        <p>{message}</p>
      </div>
    </div>
  );
});

export default Alert;
