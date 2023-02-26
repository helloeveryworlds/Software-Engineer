import axios from 'axios';

let GroceSaveService = axios.create({
    baseURL: 'http://localhost:8080/', 
    timeout: 10000,
  });

export const setClientToken = token => {
    GroceSaveService.interceptors.request.use(function(config) {
      config.headers.Authorization = `Token ${token}`;
      return config;
    });
  };
  
  export default GroceSaveService;