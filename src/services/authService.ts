import axios from "axios";
import  JanijDTO  from "../dtos/JanijDTO";



export const login = async (user: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}?user=${user}&token=${password}`);
    const data = response.data.content;
    return data.loggedIn;
  } catch (error) {
    throw error;
  }
};