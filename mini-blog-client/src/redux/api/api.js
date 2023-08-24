import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);

export const createArticle = (articleData) =>
  API.post("/articles/create", articleData);
export const updateArticle = (updatedArticleData, id) =>
  API.patch(`/articles/${id}/update`, updatedArticleData);
export const deleteArticle = (id) => API.delete(`/articles/${id}/delete`);

export const getArticles = (query) =>
  API.get(`/articles`, {
    params: {
      category: query.categoryId || null,
      page: query.page,
    },
  });
export const getArticle = (id) => API.get(`/articles/${id}`);

export const getUserArticles = (userId) => API.get(`/users/${userId}/articles`);

export const getPopularCategories = () => API.get(`/categories/popular`);
export const getCategories = () => API.get(`/categories`);
