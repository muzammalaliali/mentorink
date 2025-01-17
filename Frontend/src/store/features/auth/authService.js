import axios from 'axios'


// use this function in authSlice.js=> createAsyncThunk
// register
const registerUser = async (inputValues) => {
  try {
    const axiosResponse = await axios
        .post(`${import.meta.env.VITE_BASE_URL}/auth/register`, inputValues, {
            // automatically send cookies
            withCredentials: true,    
            headers: { "Content-Type": "application/json" },
          })
          return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again."
    return Promise.reject(errorMessage);
  }
    };

  // Getting all categories
const getAllUser = async () => {
  try {
    const axiosResponse = await axios
        .get(`${import.meta.env.VITE_BASE_URL}/auth/all-users`, {
            // automatically send cookies
            withCredentials: true,    
            headers: { "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
            
          })
          return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again."
    return Promise.reject(errorMessage);
  }
    };


    // login
  const loginUser = async (inputValues) => {
    try {
      const axiosResponse = await axios
          .post(`${import.meta.env.VITE_BASE_URL}/auth/login`, inputValues, {
               // automatically send cookies
              withCredentials: true,    
              headers: { "Content-Type": "application/json" },
            })
            return axiosResponse.data
              } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again."
        return Promise.reject(errorMessage);
      }
        }

  // logout
 const logoutUser = async (inputValues) => {
  try {
    const axiosResponse = await axios
        .get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
            // automatically send cookies
            withCredentials: true,    
            headers: { "Content-Type": "application/json" },
          })
          return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again."
    return Promise.reject(errorMessage);
  }
    };

// Delete categories
 const deleteUse = async (userId) => {
  try {
    const axiosResponse = await axios
        .delete(`${import.meta.env.VITE_BASE_URL}/auth/${userId}`, {
            // automatically send cookies
            withCredentials: true,    
            headers: { "Content-Type": "application/json" },
          })
          return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again."
    return Promise.reject(errorMessage);
  }
    };

     
const authService = {loginUser, registerUser, logoutUser, deleteUse, getAllUser}


export default authService;