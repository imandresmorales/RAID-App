import axios from 'axios'

const baseUrl = "http://localhost:3001/api/auth";


// Register User
export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/register`, user)
    return res.data;
  } catch (error) {
    console.error("Register error:", error); // Helpful for debugging
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Something went wrong. Please try again." };
    }
  }
}

// Login User
export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, userData)
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}