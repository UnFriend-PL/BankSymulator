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

export async function clearToken() {
  localStorage.removeItem("token");
}

export async function getUserEmail() {
  let token = localStorage.getItem("token");
  let decodedToken = jwtDecode(token);
  return decodedToken.email;
}

export async function getUserRole() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  }
}

