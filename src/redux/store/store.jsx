import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/userSlice";
import productReducer from "../slice/products/productSlices";
import categoryReducer from "../slice/categories/categorySlice";
import brandsReducer from "../slice/categories/brandsSlice";
import colorsReducer from "../slice/categories/colorSlice";
// CREATE STORE
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
  },
});

export default store;
