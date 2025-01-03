import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//INITIAL STATE
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// CREATE PRODUCT ACTION
export const createProductAction = createAsyncThunk(
  "products/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, description, category, sizes, brand, colors, price } =
        payload;

      // MAKE A REQUEST

      // TOKEN - AUTHENTICATED
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer${token}`,
        },
      };
      // IMAGES
      const {data} = await axios.post(
        `${baseURL}/products`,
        {
          name,
          description,
          category,
          sizes,
          brand,
          colors,
          price,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// SLICE
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // CREATE PRODUCT
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

// GENERATE REDUCER
const productReducer = productSlice.reducer;

export default productReducer;
