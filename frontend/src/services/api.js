import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);
      
      // Return formatted error
      return Promise.reject({
        status,
        message: data.detail || data.message || 'An error occurred',
        data: data
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.request);
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null
      });
    } else {
      // Something else happened
      console.error('Request Error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message || 'An unexpected error occurred',
        data: null
      });
    }
  }
);

// API service methods
export const contactsAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contacts/', contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get contact submissions (admin)
  getContacts: async (params = {}) => {
    try {
      const response = await apiClient.get('/contacts/', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const testimonialsAPI = {
  // Get testimonials for public display
  getTestimonials: async (params = { limit: 6, active: true }) => {
    try {
      const response = await apiClient.get('/testimonials/', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create testimonial (admin)
  createTestimonial: async (testimonialData) => {
    try {
      const response = await apiClient.post('/testimonials/', testimonialData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const statsAPI = {
  // Get school statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/stats/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update statistics (admin)
  updateStats: async (statsData) => {
    try {
      const response = await apiClient.patch('/stats/', statsData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Health check
export const healthAPI = {
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Export default client for custom requests
export default apiClient;