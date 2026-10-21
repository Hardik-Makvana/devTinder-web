// import { createSlice } from "@reduxjs/toolkit";

// const feedSlice = createSlice({
//   name: "feed",
//   initialState: null,
//   reducers: {
//     addFeed: (state, action) => action.payload,

//     removeUserFromFeed: (state, action) =>
//       state.filter((user) => user._id !== action.payload),
//   },
// });

// export const { addFeed, removeUserFromFeed } = feedSlice.actions;
// export default feedSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,

    removeUserFromFeed: (state, action) =>
      state.filter((user) => user._id !== action.payload),

    clearFeed: () => null,
  },
});

export const { addFeed, removeUserFromFeed, clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
