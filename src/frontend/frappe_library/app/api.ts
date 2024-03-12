import axios from 'axios';  
  
const instance = axios.create({  
    baseURL: 'http://localhost:8080/frappe_library/api/v1/', // Update this with your Flask server address  
});  
  
export default instance;  
