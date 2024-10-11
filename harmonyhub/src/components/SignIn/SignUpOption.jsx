import React from 'react';

function SignUpOption() {
    return (
        <div className="flex justify-between items-center w-full max-w-[382px] mt-14">
            <div className="flex flex-col gap-2">
                <h2 className="text-white text-xl font-bold">Dont Have An Account?</h2>
                <span className="text-white text-base">Sign Up Here</span>
            </div>
            <button className="text-white back bg-[#0E9EEF] p-1 px-5 rounded">Sign Up</button>
        </div>
    );
}

export default SignUpOption;
