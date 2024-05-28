import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
//funkcije za izvrsavanja http req
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const verifyAccount = (token) => API.get(`/users/verify/${token}`);

export const createTip = (tipData) => API.post("/tip", tipData);
export const getTips = () => API.get("/tip");
export const getTip = (id) => API.get(`/tip/${id}`);
export const deleteTip = (id) => API.delete(`/tip/${id}`);
export const updateTip = (updatedTipData, id) =>
  API.patch(`/tip/${id}`, updatedTipData);
export const likeTip = (id) => API.post(`/tip/${id}/like`);
export const dislikeTip = (id) => API.post(`/tip/${id}/dislike`);
export const getTipsByUser = (userId) => API.get(`/tip/userTips/${userId}`);
export const addCommentToTip = (id, commentData) =>
  API.post(`/tip/${id}/comment`, commentData);
export const getComments = (id) => API.get(`/tip/${id}/comments`);
export const deleteComment = (id, commentId) =>
  API.delete(`/tip/${id}/comment/${commentId}`);
export const markTipAsSuccess = (id) => API.put(`/tip/${id}/success`);
export const markTipAsFailed = (id) => API.put(`/tip/${id}/failed`);
