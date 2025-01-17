import axios from 'axios'


// use this function in authSlice.js=> createAsyncThunk
// register
const createEvent = async (inputValues) => {
  try {
    const axiosResponse = await axios
        .post(`${import.meta.env.VITE_BASE_URL}/event`, inputValues, {
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
const getAllEvent = async () => {
  try {
    const axiosResponse = await axios
        .get(`${import.meta.env.VITE_BASE_URL}/event`, {
            // automatically send cookies
            withCredentials: true,    
            headers: { "Content-Type": "application/json",
             },
            
          })
          return axiosResponse.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong! Please try again."
    return Promise.reject(errorMessage);
  }
    };

    const getSingleEvent = async (eventId) => {
      try {
        const axiosResponse = await axios
            .get(`${import.meta.env.VITE_BASE_URL}/event/${eventId}`, {
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
 const deleteEvent = async (eventId) => {
  try {
    const axiosResponse = await axios
        .delete(`${import.meta.env.VITE_BASE_URL}/event/${eventId}`, {
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
const updateEvent = async (eventId) => {
    try {
      const axiosResponse = await axios
          .put(`${import.meta.env.VITE_BASE_URL}/event/${eventId}`, {
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
  
     
const eventService = { createEvent, updateEvent, getAllEvent, getSingleEvent, deleteEvent}


export default eventService;