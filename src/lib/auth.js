export const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123",
  token: "admin-token-12345",
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") === ADMIN_CREDENTIALS.token;
  }
  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
};
