import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  LOGGED_IN_USER: 'loggedInUser',
  USER_TOKEN: 'userToken',
  AUTH_TOKEN: 'authToken', // For JWT or other auth tokens
};

// Get stored user credentials
export const getStoredCredentials = async () => {
  try {
    const email = await AsyncStorage.getItem(STORAGE_KEYS.EMAIL);
    const password = await AsyncStorage.getItem(STORAGE_KEYS.PASSWORD);
    return { email, password };
  } catch (error) {
    console.error('Error getting stored credentials:', error);
    return { email: null, password: null };
  }
};

// Get stored user profile
export const getStoredUserProfile = async () => {
  try {
    const userProfileString = await AsyncStorage.getItem(STORAGE_KEYS.LOGGED_IN_USER);
    return userProfileString ? JSON.parse(userProfileString) : null;
  } catch (error) {
    console.error('Error getting stored user profile:', error);
    return null;
  }
};

// Get stored user token
export const getStoredUserToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  } catch (error) {
    console.error('Error getting stored user token:', error);
    return null;
  }
};

// Get stored auth token (JWT, etc.)
export const getStoredAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting stored auth token:', error);
    return null;
  }
};

// Clear all stored data
export const clearStoredData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.EMAIL,
      STORAGE_KEYS.PASSWORD,
      STORAGE_KEYS.LOGGED_IN_USER,
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.AUTH_TOKEN,
    ]);
  } catch (error) {
    console.error('Error clearing stored data:', error);
  }
};

// Update stored user profile
export const updateStoredUserProfile = async (updatedProfile: any) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LOGGED_IN_USER, JSON.stringify(updatedProfile));
  } catch (error) {
    console.error('Error updating stored user profile:', error);
  }
};

// Store user token
export const storeUserToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
  } catch (error) {
    console.error('Error storing user token:', error);
  }
};

// Store user profile
export const storeUserProfile = async (profile: any) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LOGGED_IN_USER, JSON.stringify(profile));
  } catch (error) {
    console.error('Error storing user profile:', error);
  }
};

// Create authenticated fetch headers
export const getAuthHeaders = async () => {
  try {
    const authToken = await getStoredAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` })
    };
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return { 'Content-Type': 'application/json' };
  }
};

// Make authenticated API call
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  try {
    const headers = await getAuthHeaders();
    return fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      }
    });
  } catch (error) {
    console.error('Error making authenticated request:', error);
    throw error;
  }
};
