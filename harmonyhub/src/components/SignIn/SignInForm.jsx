import React from 'react';
import InputField from "./InputField";
import { useState } from 'react';
import axios from 'axios'

function SignInForm() {
    //control value of inputbox
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    });

    //function control value of inputbox
    function handleChange(event) {
        const { name, value } = event.target;
        setInputValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    //function navigate to forgetpassword
    const handleForget = (event) => {
        alert("Forget password?")
    }

    //function navigate to signin
    const handleSignIn = async () => {
        try {
            const data = await axios.post("http://localhost:5000/login", {
                email: inputValue.email,
                password: inputValue.password
            });

            // Handle successful login
            console.log('Login successful:', data.data.metadata.user);
            alert("Login successful!");

        } catch (error) {
            // Handle error
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert("Login failed. Please check your credentials and try again.");
        } axios.post("http://localhost:5000/login", {
            email: inputValue.email,
            password: inputValue.password
        })

    }

    return (
        <section className="flex flex-col my-9 w-full max-w-[382px]">
            <h2 className="text-2xl font-bold text-white">Login To Continue</h2>
            <div>
                <InputField
                    label="E-Mail"
                    placeholder="Enter Your E-Mail"
                    type="email"
                    isRequired={true}
                    name="email"
                    onChange={handleChange}
                    value={inputValue.email}
                />
                <InputField
                    label="Password"
                    placeholder="Enter Your Password"
                    type="password"
                    isRequired={true}
                    name="password"
                    onChange={handleChange}
                    value={inputValue.password}

                />
                <button className="flex justify-center items-center mt-6 w-full text-base font-bold text-white whitespace-nowrap px-6 py-1.5 bg-pink-500 rounded min-h-[34px]" onClick={() => handleSignIn()}>
                    Login
                </button>
            </div>
            <div className="flex justify-center items-center mt-6 max-w-full text-sm font-light text-center text-white w-[122px]">
                <button className="flex-1 shrink self-stretch my-auto basis-0" onClick={() => handleForget()}>
                    Forgot password
                </button>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/74e2880fa463535349695bdcf5ff3b95019025251703a844e8dddeb4bb356de2?placeholderIfAbsent=true&apiKey=22c14f20518e4798aad5af9f84c700f9"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.06] w-[17px]"
                />
            </div>
        </section>
    );
}

export default SignInForm;