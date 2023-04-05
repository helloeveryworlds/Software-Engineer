import axios from 'axios';
import { Platform } from "react-native";


let GroceSaveService = axios.create({
    baseURL: Platform.OS === "ios" ? 'http://localhost:8080/' : 'http://10.0.2.2:8080/', 
    timeout: 10000,
  });

export const setClientToken = token => {
    GroceSaveService.interceptors.request.use(function(config) {
      config.headers.Authorization = `Token ${token}`;
      return config;
    });
  };
  
  export default GroceSaveService;