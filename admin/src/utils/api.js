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
          "Content-Type": "multipart/form-data", // Ensure correct content type for file uploads
        },
      }
    );
    return response.data; // Axios response contains data in the 'data' property
  } catch (error) {
    console.error("Error uploading image:", error);
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
