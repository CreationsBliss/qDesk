import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {

  const { logOutUser } = useAuth()
  const navigate = useNavigate()

  axiosSecureInstance.interceptors.response.use(response => {
    return response;
  }, async error => {
    if (error.response.status === 401 || error.response.status === 403) {
      await logOutUser()
      navigate("/login")
    }
    return Promise.reject(error);
  });



  return axiosSecureInstance;
};

export default useAxiosSecure;