import axios from 'axios';

async function apiService(method, url, data, requiresAuth=false) {
  
  const config = {
    method: method,
    url: url,
    data: data,
  };

  if (requiresAuth) {
    const token = localStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Api errors
      const { data, status } = error.response;
      let errors = data.errors.map((error) => {
        return { message: error, type: "error" };
      });
      console.error(`API Error - Status: ${status}, Data:`, data);
      return errors;
    } else if (error.request) {
      // no server response
      console.error('No response from server');
      throw { status: 500, message: 'No response from server' };
    } else {
      // rest of the errors
      console.error('Request failed', error.message);
      throw { status: 500, message: 'Request failed', details: error.message };
    }
  }
}

export default apiService;