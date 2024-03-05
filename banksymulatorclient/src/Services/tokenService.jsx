import { jwtDecode } from "jwt-decode";

export async function isTokenExpired() {
  let token = localStorage.getItem("token");
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();
  console.log("token", decodedToken.exp * 1000);
  console.log("actual Timestamp", currentDate.getTime());
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return true;
  }
  return false;
}

export async function refreshToken() {}
