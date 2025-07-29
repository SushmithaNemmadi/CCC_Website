// src/services/auth.js
export const checkToken = async (token) => {
  try {
    const response = await fetch("http://localhost:5000/api/verifyToken", {
      method: "GET", // it's a GET request, not POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ensure token is sent correctly
      },
    });

    // If response is not JSON (e.g. 404 HTML page), this will throw
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Token check failed");
    }

    return data.valid; // should return true if token is valid
  } catch (error) {
    console.error("Token validation failed:", error.message);
    return false;
  }
};
