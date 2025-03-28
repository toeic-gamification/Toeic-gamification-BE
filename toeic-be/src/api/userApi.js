import axios from "axios";

const API_URL = "http://localhost:4000/api/users"; // URL backend

// Lấy danh sách tất cả users
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy users:", error);
    return [];
  }
};

// Lấy user theo ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy user ${id}:`, error);
    return null;
  }
};
