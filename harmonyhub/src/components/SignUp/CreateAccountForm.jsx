import React from "react";
import { useRef } from "react";
import { useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import AlertComponent from "../Utils/Alert/Alert";

function CreateAccountForm() {
  const [alertMessage, setAlertMessage] = useState("");
  const alertRef = useRef();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      let responseData = await registerUser(username, email, password);
      //add alert to show the response data
      setAlertMessage(JSON.stringify(responseData));
      alertRef.current.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAlertClose = () => {
    alertRef.current.close();
  };

  const registerUser = async (username, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return (
    <section className="flex flex-col mt-9 w-full max-w-[382px]">
      <h2 className="text-2xl font-bold text-white">Create An Account</h2>
      <form>
        <InputField
          ref={usernameRef}
          label="Name"
          placeholder="Enter Your Name"
          isRequired={true}
        />
        <InputField
          ref={emailRef}
          label="E-Mail"
          placeholder="Enter Your E-Mail"
          type="email"
          isRequired={true}
        />
        <InputField
          ref={passwordRef}
          label="Password"
          placeholder="Enter Your Password"
          type="password"
          isRequired={true}
        />
        <button
          className="flex justify-center items-center mt-6 w-full text-base font-bold text-white whitespace-nowrap px-6 py-1.5 bg-pink-500 rounded min-h-[34px]"
          onClick={handleSubmit}
        >
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
      <AlertComponent
        message={alertMessage}
        handleClose={handleAlertClose}
        ref={alertRef}
      />
    </section>
  );
}

export default CreateAccountForm;
