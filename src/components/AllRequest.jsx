import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

//Alle Posts
export const getAllPosts = () => axios.get(API_URL);

//Post by id
export const getPostById = (id) => axios.get(`${API_URL}/${id}`);

// create Post
export const createPost = (postData) => axios.post(API_URL, postData);

// Update Post
export const updatePost = (id, updatedData) =>
  axios.put(`${API_URL}/${id}`, updatedData);

// delete Post
export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
