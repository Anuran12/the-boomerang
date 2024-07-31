import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_BASE_URL + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImage = async (url, formData) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // Set a timeout of 30 seconds
      }
    );

    // Handle different status codes if necessary
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Unexpected response status: ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error(`Server responded with status: ${error.response.status}`);
    } else if (error.request) {
      // No response received
      console.error("No response received from server");
    } else {
      // Error setting up request
      console.error("Error setting up request:", error.message);
    }
    throw error; // Rethrow error for further handling if necessary
  }
};

export const postData = async (url, formData) => {
  try {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      //console.log(data)
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const editData = async (url, updatedData) => {
  const { res } = await axios.put(
    `${process.env.REACT_APP_BASE_URL}${url}`,
    updatedData
  );
  return res;
};

export const deleteData = async (url) => {
  const { res } = await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);
  return res;
};

export const deleteImages = async (url, image) => {
  const { res } = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}${url}`,
    image
  );
  return res;
};
