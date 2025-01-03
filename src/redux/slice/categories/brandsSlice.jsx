import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//INITIAL STATE
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// CREATE BRAND ACTION
export const createBrandAction = createAsyncThunk(
  "brands/createBrand",
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
        `${baseURL}/brand/createBrand`,
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

// FETCH BRANDS ACTION
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetchAll",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // IMAGES
      const { data } = await axios.get(`${baseURL}/brands/getBrands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// SLICE
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    // CREATE CATEGORY
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // FETCH ALL CATEGORY
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

// GENERATE REDUCER
const brandsReducer = brandsSlice.reducer;

export default brandsReducer  ;
