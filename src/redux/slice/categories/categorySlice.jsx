import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//INITIAL STATE
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// CREATE CATEGORY ACTION
export const createCategoryAction = createAsyncThunk(
  "categories/createCategory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      // MAKE A REQUEST

      // TOKEN - AUTHENTICATED
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // IMAGES
      const { data } = await axios.post(
        `${baseURL}/categories`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// FETCH CATEGORY ACTION
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetchAll",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // IMAGES
      const { data } = await axios.get(`${baseURL}/categories/getCategories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// SLICE
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    // CREATE CATEGORY
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // FETCH ALL CATEGORY
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

// GENERATE REDUCER
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
