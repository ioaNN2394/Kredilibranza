// src/api.js

const apiUrl = "https://kredilibranza-production.up.railway.app";

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
