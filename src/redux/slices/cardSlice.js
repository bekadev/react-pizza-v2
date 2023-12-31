import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload)
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum
    //   }, 0)
    // },

    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count--
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(x => x.id !== action.payload)
    },
    clearItem: (state) => {
      state.items = []
      state.totalPrice = 0
    }
  },
})

export const selectCard = (state) => state.card

export const {addItem, minusItem, removeItem, clearItem} = cardSlice.actions

export default cardSlice.reducer