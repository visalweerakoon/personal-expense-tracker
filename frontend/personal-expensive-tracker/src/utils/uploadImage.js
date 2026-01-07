import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

/**
 * Upload an image file to the server
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} - Returns the response data from the server
 */
const uploadImage = async (imageFile) => {
  // Create a FormData object to send file via POST request
  const formData = new FormData();
  formData.append('image', imageFile); // Key must match server expectation

  try {
    // Send POST request to upload the image
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file upload
        },
      }
    );

    // Return the response data (usually contains the image URL)
    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error); // Log error for debugging
    throw error; // Re-throw so caller can handle it
  }
};

export default uploadImage;
