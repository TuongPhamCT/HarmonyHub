import React, { useState, useRef } from "react";
import InputField from "./InputField";
import axios from "axios";
import Alert from "../Utils/Alert/Alert";

function CreateAccountForm() {
  const [alertMessage, setAlertMessage] = useState("");
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
      // Set the alert message
      setAlertMessage(JSON.stringify(responseData));
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(`Error: ${error.message}`);
    }
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
      throw error;
    }
  };

  return (
    <section className="flex flex-col mt-9 w-full max-w-[382px]">
      <h2 className="text-2xl font-bold text-white">Create An Account</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          ref={usernameRef}
          label="Name"
          placeholder="Enter Your Name"
          isRequired={true}
          pattern="^[a-zA-Z0-9_]{3,15}$"
          errorMessage="Username must be 3-15 characters long and can only contain letters, numbers, and underscores."
        />
        <InputField
          ref={emailRef}
          label="E-Mail"
          placeholder="Enter Your E-Mail"
          type="email"
          isRequired={true}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          errorMessage="Please enter a valid email address."
        />
        <InputField
          ref={passwordRef}
          label="Password"
          placeholder="Enter Your Password"
          type="password"
          isRequired={true}
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          errorMessage="Password must be at least 8 characters long and contain at least one letter and one number."
        />
        <button className="flex justify-center items-center mt-6 w-full text-base font-bold text-white whitespace-nowrap px-6 py-1.5 bg-pink-500 rounded min-h-[34px]">
          Signup
        </button>
      </form>
      <Alert message={alertMessage} />
    </section>
  );
}

export default CreateAccountForm;
