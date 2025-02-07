import { setsAccessToken } from "../../src/components/config/store.ts";
import { sUser } from "../store";

export const handleLogin = (accessToken, userName, role) => {
  setsAccessToken(accessToken);
  localStorage.setItem("accessToken", accessToken);
  

  // Tên người dùng
  sUser.set((v) => v.value.userName = userName || "User");
  localStorage.setItem("userName", userName || "User");

  // phân quyền người dùng
  localStorage.setItem("userRole", role); 
  switch (role) {
    case "admin":
      sUser.set((v) => v.value.privilege = [0, 1, 3]);
      break;
    case "user":
      sUser.set((v) => v.value.privilege = [0, 1, 2]);
      break;
    case "artist":
      sUser.set((v) => v.value.privilege = [0, 1, 2]);
      break;
    case "guest":
      sUser.set((v) => v.value.privilege = [0]);
      break;
    default:
      sUser.set((v) => v.value.privilege = [0]);
      break;
  }

  // admin
  // sUser.set((v) => v.value.privilege = [1, 2, 3]);
}

export const autoLogin = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken !== null && accessToken.length > 0) {
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    handleLogin(accessToken, userName, userRole);
  }
}