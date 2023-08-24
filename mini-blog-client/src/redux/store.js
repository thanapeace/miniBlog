import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/authReducer";
import ArticleReducer from "./reducers/articleReducer";
import categoryReducer from "./reducers/categoryReducer";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    article: ArticleReducer,
    category: categoryReducer,
  },
});
