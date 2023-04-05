import axios from 'axios';
import { Platform } from "react-native"; 

let GroceSaveItemService = axios.create({
    baseURL: Platform.OS === "ios" ? 'http://localhost:8800/' : 'http://10.0.2.2:8800/', 
    timeout: 10000,
  });

export const setClientToken = token => {
    GroceSaveItemService.interceptors.request.use(function(config) {
      config.headers.Authorization = `Token ${token}`;
      return config;
    });
  };
  
  export default GroceSaveItemService;