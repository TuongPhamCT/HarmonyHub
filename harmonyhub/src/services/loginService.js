import { setsAccessToken } from "../../src/components/config/store.ts";
import { sUser } from "../store";

export const handleLogin = (data) => {
  setsAccessToken(data.accessToken);
  localStorage.setItem("accessToken", data.accessToken);
  

  // Tên người dùng
  sUser.set((v) => v.value.userName = "User");

  // phân quyền người dùng

  // người dùng thường
  sUser.set((v) => v.value.privilege = [0, 1, 2]);

  // admin
  // sUser.set((v) => v.value.privilege = [1, 2, 3]);
}