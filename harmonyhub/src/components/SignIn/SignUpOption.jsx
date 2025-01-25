import React from 'react';

//function navigate to signup
const handleSignUp = () => {
    alert("Sign Up ?")
}

function SignUpOption() {
    return (
        <div className="flex justify-center items-center h-full max-w-[400px] w-[400px] mt-14">
            <button className="text-white back bg-[#0E9EEF] p-1 px-5 rounded" onClick={() => handleSignUp()}>Sign Up</button>
        </div>
    );
}

export default SignUpOption;