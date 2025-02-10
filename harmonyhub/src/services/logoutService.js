import { setsAccessToken } from "../../src/components/config/store.ts";
import { sUser } from "../store";

export const handleLogout = () => {
  setsAccessToken("");
  localStorage.setItem("accessToken", "");
  
  // Tên người dùng
  sUser.set((v) => v.value.userName = "Guest");
  localStorage.setItem("userName", "");

  // phân quyền người dùng

  // guest
  sUser.set((v) => v.value.privilege = [0]);
  localStorage.setItem("userRole", "guest");
}