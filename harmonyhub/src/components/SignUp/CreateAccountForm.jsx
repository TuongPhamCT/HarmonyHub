import React from "react";
import InputField from "./InputField";

function CreateAccountForm() {
  return (
    <section className="flex flex-col mt-9 w-full max-w-[382px]">
      <h2 className="text-2xl font-bold text-white">Create An Account</h2>
      <form>
        <InputField label="Name" placeholder="Enter Your Name" />
        <InputField
          label="E-Mail"
          placeholder="Enter Your E-Mail"
          type="email"
        />
        <InputField
          label="Password"
          placeholder="Enter Your Password"
          type="password"
        />
        <button className="flex justify-center items-center mt-6 w-full text-base font-bold text-white whitespace-nowrap px-6 py-1.5 bg-pink-500 rounded min-h-[34px]">
          Signup
        </button>
      </form>
      <div className="flex justify-center items-center mt-6 max-w-full text-sm font-light text-center text-white w-[122px]">
        <button className="flex-1 shrink self-stretch my-auto basis-0">
          Forgot password
        </button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/74e2880fa463535349695bdcf5ff3b95019025251703a844e8dddeb4bb356de2?placeholderIfAbsent=true&apiKey=22c14f20518e4798aad5af9f84c700f9"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-[1.06] w-[17px]"
        />
      </div>
      <div className="flex gap-3 justify-center items-center mt-6 w-full text-sm text-center text-white whitespace-nowrap">
        <div
          className="flex-1 shrink self-stretch my-auto h-0 border border-white border-solid basis-0 w-[172px]"
          aria-hidden="true"
        />
        <span className="self-stretch my-auto">Or</span>
        <div
          className="flex-1 shrink self-stretch my-auto h-0 border border-white border-solid basis-0 w-[171px]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default CreateAccountForm;
