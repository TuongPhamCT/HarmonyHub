import React from "react";
import { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  {
    label,
    placeholder,
    type = "text",
    isRequired = false,
    pattern,
    errorMessage,
  },
  ref
) {
  const handleInvalid = (e) => {
    if (errorMessage) {
      e.target.setCustomValidity(errorMessage);
    }
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <div className="flex flex-col justify-center mt-6 w-full">
      <label
        htmlFor={`${label.toLowerCase()}Input`}
        className="text-base font-medium text-white text-left"
      >
        {label}
      </label>
      <div className="flex flex-col justify-center py-2 pr-1 pl-2 mt-2 w-full text-xs text-white rounded border-2 border-solid border-zinc-300 min-h-[40px]">
        <div className="flex gap-1 items-center w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f7eb6391bb22c26f6134989ad3236d656ef9696adc63436fdf1fbc9c005ccdb?placeholderIfAbsent=true&apiKey=22c14f20518e4798aad5af9f84c700f9"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <input
            ref={ref}
            required={isRequired}
            type={type}
            id={`${label.toLowerCase()}Input`}
            placeholder={placeholder}
            pattern={pattern}
            onInvalid={handleInvalid}
            onInput={handleInput}
            className="flex-1 shrink self-stretch my-auto basis-0 bg-transparent border-none outline-none text-white"
          />
        </div>
      </div>
    </div>
  );
});

export default InputField;
