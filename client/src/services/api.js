import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all crops
export const getCrops = async () => {
  const response = await api.get('/crops');
  return response.data;
};

// Get crop by ID
export const getCropById = async (id) => {
  const response = await api.get(`/crops/${id}`);
  return response.data;
};

// Get user's selected crops
export const getUserCrops = async () => {
  const response = await api.get('/user/crops');
  return response.data;
};

// Add crop to user's selection
export const addUserCrop = async (cropId, location) => {
  const response = await api.post('/user/crops', { cropId, location });
  return response.data;
};

// Remove crop from user's selection
export const removeUserCrop = async (cropId, location) => {
  const response = await api.delete(`/user/crops/${cropId}?location=${location}`);
  return response.data;
};

// Get user activities
export const getUserActivities = async (location, days = 14) => {
  const response = await api.get('/user/activities', {
    params: { location, days },
  });
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

// Get Gardest items
export const getRecommendedProducts = async () => {
  const response = await api.get('/products'); // Eeldame, et backendis on see route olemas
  return response.data;
};