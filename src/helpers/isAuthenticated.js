import cookie from "js-cookie";
import decode from "jwt-decode";

const isAuthenticated = () => {
  const token = cookie.get("token");

  if (!token) {
    return false;
  }

  // checks if token is malformed
  try {
    decode(token);
  } catch (error) {
    cookie.remove("token");
    cookie.remove("user");
    return false;
  }
  return true;
};

export default isAuthenticated;
