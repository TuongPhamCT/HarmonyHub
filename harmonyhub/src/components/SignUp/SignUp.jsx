import React from "react";
import CreateAccountForm from "./CreateAccountForm";
import SocialLogin from "./SocialLogin";
import background from "../../assets/img/signinbackground.png";
import { forwardRef } from "react";

const SignUp = forwardRef(function SignUp({ handleClose, isVisible }, ref) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 w-full h-full bg-black bg-opacity-80 z-50 ${
          isVisible ? "block" : "hidden"
        }`}
      ></div>

      {/* Dialog */}
      <dialog ref={ref} className={`z-50 ${isVisible ? "block" : "hidden"}`}>
        <main
          style={{ "--image-url": `url(${background})` }}
          className="flex overflow-hidden flex-col items-center pt-0 pb-10 pl-4 pr-4 mx-auto w-[400px] h-[700px] bg-[image:var(--image-url)] bg-cover bg-center"
        >
          <form
            method="dialog"
            className="text-white font-bold text-right flex justify-end w-full"
          >
            <button onClick={handleClose} className=" mt-2 mr-0 ">
              X
            </button>
          </form>
          <section className="flex items-center self-stretch m-0 p-0 text-2xl font-bold whitespace-nowrap rounded-none">
            <div className="flex flex-col flex-1 m-0 p-0 shrink justify-center items-center self-stretch  w-min basis-0">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a6b262b319afd508fb482127119771fb254713ec3f512ea9b4e3c90ab5210f3?placeholderIfAbsent=true&apiKey=22c14f20518e4798aad5af9f84c700f9"
                alt="HarmonyHub logo"
                className="w-20"
              />
            </div>
          </section>
          <CreateAccountForm />
          <SocialLogin />
        </main>
      </dialog>
    </>
  );
});

export default SignUp;
