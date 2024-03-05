import { jwtDecode } from "jwt-decode";

export async function isTokenExpired() {
  let token = localStorage.getItem("token");
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return true;
  }
  return false;
}

export async function getUserEmail() {
  let token = localStorage.getItem("token");
  let decodedToken = jwtDecode(token);
  return decodedToken.email;
}

// export async function refreshToken() {}
