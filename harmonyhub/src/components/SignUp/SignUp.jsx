import React from "react";
import CreateAccountForm from "./CreateAccountForm";
import SocialLogin from "./SocialLogin";
import background from "../../assets/img/signinbackground.png";
import { forwardRef } from "react";

const SignUp = forwardRef(function SignUp({ handleClose }, ref) {
  return (
    <dialog ref={ref}>
      <main
        style={{ "--image-url": `url(${background})` }}
        className="flex overflow-hidden flex-col items-center pt-4 pb-32 mx-auto w-[480px] h-[800px] bg-[image:var(--image-url)] bg-cover bg-center "
      >
        <form
          method="dialog"
          className="text-white font-bold text-right flex justify-end w-full "
        >
          <button onClick={handleClose} className="">
            Close
          </button>
        </form>
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
        <CreateAccountForm />
        <SocialLogin />
      </main>
    </dialog>
  );
});

export default SignUp;
