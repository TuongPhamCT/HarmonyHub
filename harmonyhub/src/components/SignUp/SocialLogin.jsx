import React from "react";

function SocialLoginButton({ provider, iconSrc }) {
  return (
    <button className="flex overflow-hidden flex-1 shrink justify-between items-center self-stretch m-5 px-3 py-2.5 my-auto text-white rounded-3xl border-2 border-white border-solid basis-0">
      <img
        loading="lazy"
        src={iconSrc}
        alt={`${provider} icon`}
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
      />
      <span className="flex-1 shrink self-stretch my-auto basis-0">
        {provider} Login
      </span>
    </button>
  );
}

function SocialLoginButtons() {
  return (
    <div className="flex gap-3 items-center mt-6 w-full text-sm text-center px-5">
      <SocialLoginButton
        provider="Google"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/3a19a677cd48f655ad46686ec59f6a962d7e13ebd6669c7ca3a950efb619744c?placeholderIfAbsent=true&apiKey=22c14f20518e4798aad5af9f84c700f9"
      />
      <SocialLoginButton
        provider="Facebook"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/369cca4460055f5ae5a257f87f36222a493942dac0e6811f98b945210ad8a4bf?placeholderIfAbsent=true&apiKey=22c14f20518e4798aad5af9f84c700f9"
      />
    </div>
  );
}

export default SocialLoginButtons;
