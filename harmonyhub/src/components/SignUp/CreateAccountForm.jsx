import React, { useState, useRef } from "react";
import InputField from "./InputField";
import axios from "axios";
import Alert from "../Utils/Alert/Alert";
import { showAlert } from "../MainPage/services/showAlertService";

function CreateAccountForm( {handleClose} ) {
  const [alertMessage, setAlertMessage] = useState("");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const alertRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const passwordConfirm = passwordConfirmRef.current.value;

      if (password !== passwordConfirm) {
        passwordConfirmRef.current.setCustomValidity("Passwords do not match.");
        passwordConfirmRef.current.reportValidity();
      } else {
        let responseData = await registerUser(username, email, password);
        console.log(responseData);
        // Set the alert message
        showAlert(JSON.stringify(responseData.message));
        //await alertRef.current.showDialog();
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
        handleClose();
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        setAlertMessage(
          `Error: ${JSON.stringify(error.response.data.message)}`
        );
      } else {
        setAlertMessage(`Error: ${error.message}`);
      }
      alertRef.current.showDialog();
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          name,
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
    <section className="flex flex-col m-0 w-full max-w-[382px]">
      <form onSubmit={handleSubmit}>
        <InputField
          ref={usernameRef}
          label="Name"
          placeholder="Enter Your Name"
          isRequired={true}
          pattern="^[a-zA-Z][a-zA-Z0-9_ ]{2,30}$"
          errorMessage="Name is required and must start with a letter, and be between 3 and 15 characters long."
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
        <InputField
          ref={passwordConfirmRef}
          label="Password Confirmation"
          placeholder="Enter Your Password Again"
          type="password"
          isRequired={true}
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          errorMessage="Password must be at least 8 characters long and contain at least one letter and one number."
        />
        <button className="flex justify-center items-center mt-6 w-full text-base font-bold text-white whitespace-nowrap px-6 py-1.5 bg-pink-500 rounded min-h-[34px]">
          Signup
        </button>
      </form>
      <Alert message={alertMessage} ref={alertRef} />
    </section>
  );
}

export default CreateAccountForm;
