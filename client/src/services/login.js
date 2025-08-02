import axios from 'axios'

const baseUrl = "http://localhost:3001/api/auth";

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

export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, userData);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);


    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {

      throw new Error('Login failed. Please check your network or try again.');
    }
  }
}
