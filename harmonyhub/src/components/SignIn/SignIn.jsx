import React  from "react"
import background from "../../assets/img/signinbackground.png";
import SignInForm from "./SignInForm";
import SocialLogin from "../SignUp/SocialLogin"
import SignUpOption from "./SignUpOption";

function SignIn (){
    return (
        <main 
            style={{"--image-url":`url(${background})`}}
            className="flex flex-col items-center pt-4 pb-32 mx-auto w-full max-w-[480px] max-h-[800px] bg-[image:var(--image-url)] bg-cover bg-center h-screen"
        >
            <section className="flex gap-2.5 items-center self-stretch mt-0 text-2xl font-bold whitespace-nowrap rounded-none ">
                <div className="flex flex-col flex-1 shrink justify-center items-center self-stretch my-auto w-full basis-0 min-w-[240px]">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a6b262b319afd508fb482127119771fb254713ec3f512ea9b4e3c90ab5210f3?placeholderIfAbsent=true&apiKey=22c14f20518e4798aad5af9f84c700f9"
                        alt="HarmonyHub logo"
                        className="object-contain aspect-[0.88] w-[68px]"
                    />
                    <h1 className="mt-2.5 text-white">HarmonyHub</h1>
                </div>
            </section>
            <SignInForm />
            <SocialLogin />
            <SignUpOption />
        </main>
    )
}

export default SignIn