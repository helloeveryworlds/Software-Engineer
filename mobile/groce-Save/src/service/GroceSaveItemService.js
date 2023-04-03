import axios from 'axios';

let GroceSaveItemService = axios.create({
    baseURL: 'http://localhost:8800/', 
    timeout: 10000,
  });

export const setClientToken = token => {
    GroceSaveItemService.interceptors.request.use(function(config) {
      config.headers.Authorization = `Token ${token}`;
      return config;
    });
  };
  
  export default GroceSaveItemService;