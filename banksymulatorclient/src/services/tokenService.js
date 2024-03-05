import jwt from "jsonwebtoken";

function isTokenExpired(token) {
  const decodedToken = jwt.decode(token);

  if (!decodedToken || !decodedToken.exp) {
    return true;
  }

  const dateNow = new Date();

  return decodedToken.exp < dateNow.getTime() / 1000;
}

async function refreshToken(refreshToken) {
  try {
    const response = await axios.post("/api/token/refresh", { refreshToken });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
    }
  } catch (err) {
    console.error(err);
  }
}
