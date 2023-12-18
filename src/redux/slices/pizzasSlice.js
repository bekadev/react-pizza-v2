import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
  items: [],
  status: 'loading'
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const {order, sortBy, category, search, pageCount} = params
    const {data} = await axios.get(`https://65759a74b2fbb8f6509d43e8.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('PIZZA NO')
    }

    return thunkAPI.fulfillWithValue(data)
  }
)

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "success"
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error"
        state.items = []
      })
  }
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer