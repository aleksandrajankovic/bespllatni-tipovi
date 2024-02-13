import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTip = createAsyncThunk(
  "tip/createTip",
  async (
    { updatedTipData, navigate, toast },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.createTip(updatedTipData);
      toast.success("Tip Added Successfully");

      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getTips = createAsyncThunk(
  "tip/getTips",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTips();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTip = createAsyncThunk(
  "tip/getTip",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTip(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTip = createAsyncThunk(
  "tip/deleteTip",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTip(id);
      toast.success("Tip Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTip = createAsyncThunk(
  "tip/updateTip",
  async ({ id, updatedTipData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTip(updatedTipData, id);
      toast.success("Tip Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const likeTip = createAsyncThunk(
  "tip/likeTip",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTip(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const dislikeTip = createAsyncThunk(
  "tip/dislikeTip",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.dislikeTip(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addCommentToTip = createAsyncThunk(
  "tip/addCommentToTip",
  async ({ id, commentData }, { rejectWithValue }) => {
    try {
      const response = await api.addCommentToTip(id, commentData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getComments = createAsyncThunk(
  "tip/getComments",
  async (tipId, { rejectWithValue }) => {
    try {
      console.log(`Fetching comments for tip with ID: ${tipId}`);

      const response = await api.getComments(tipId);

      console.log("Comments fetched successfully:", response.data);

      return { tipId, comments: response.data };
    } catch (err) {
      console.error("Error fetching comments:", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteComment = createAsyncThunk(
  "tip/deleteComment",
  async ({ tipId, commentId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteComment(tipId, commentId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const markTipAsSuccess = createAsyncThunk(
  "tip/markAsSuccess",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.markTipAsSuccess(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const markTipAsFailed = createAsyncThunk(
  "tip/markAsFailed",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.markTipAsFailed(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tipSlice = createSlice({
  name: "tip",
  initialState: {
    tip: {},
    tips: [],
    userTips: [],
    error: "",
    loading: false,
    comments: [],
  },
  extraReducers: {
    [createTip.pending]: (state, action) => {
      state.loading = true;
    },
    [createTip.fulfilled]: (state, action) => {
      state.loading = false;
      state.tip = [action.payload];
    },
    [createTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTips.pending]: (state, action) => {
      state.loading = true;
    },
    [getTips.fulfilled]: (state, action) => {
      state.loading = false;
      state.tips = action.payload;
    },
    [getTips.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTip.pending]: (state, action) => {
      state.loading = true;
    },
    [getTip.fulfilled]: (state, action) => {
      state.loading = false;
      state.tip = action.payload;
    },
    [getTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteTip.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTip.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTips = state.userTips.filter((item) => item._id !== id);
        state.tips = state.tips.filter((item) => item._id !== id);
      }
    },
    [deleteTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTip.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTip.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTips = state.userTips.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tips = state.tips.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeTip.pending]: (state, action) => {
      state.loading = true;
    },
    [likeTip.fulfilled]: (state, action) => {
      const likedTip = action.payload;

      if (likedTip) {
        const existingTipIndex = state.tips.findIndex(
          (tip) => tip._id === likedTip._id
        );

        if (existingTipIndex !== -1) {
          state.tips[existingTipIndex] = likedTip;
        } else {
          state.tips.push(likedTip);
        }
      } else {
        console.error(
          "Like tip error: Unexpected payload format",
          action.payload
        );
      }

      state.loading = false;
      state.error = undefined;
    },
    [likeTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Nepoznata greška";
    },
    [dislikeTip.pending]: (state, action) => {
      state.loading = true;
    },
    [dislikeTip.fulfilled]: (state, action) => {
      const dislikedTip = action.payload;

      if (dislikedTip) {
        const existingTipIndex = state.tips.findIndex(
          (tip) => tip._id === dislikedTip._id
        );

        if (existingTipIndex !== -1) {
          state.tips[existingTipIndex] = dislikedTip;
        } else {
          state.tips.push(dislikedTip);
        }
      } else {
        console.error(
          "Like tip error: Unexpected payload format",
          action.payload
        );
      }

      state.loading = false;
      state.error = undefined;
    },
    [dislikeTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Nepoznata greška";
    },
    [addCommentToTip.pending]: (state, action) => {
      state.loading = true;
    },
    [addCommentToTip.fulfilled]: (state, action) => {
      console.log("Add comment to tip fulfilled:", action.payload);
      const updatedTip = action.payload;

      if (updatedTip) {
        const existingTipIndex = state.tips.findIndex(
          (tip) => tip._id === updatedTip._id
        );

        if (existingTipIndex !== -1) {
          state.tips[existingTipIndex] = updatedTip;
        } else {
          state.tips.push(updatedTip);
        }
      } else {
        console.error(
          "Add comment to tip error: Unexpected payload format",
          action.payload
        );
      }

      state.loading = false;
      state.error = undefined;
    },
    [addCommentToTip.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Nepoznata greška";
    },
    [getComments.fulfilled]: (state, action) => {
      console.log("Get comments fulfilled:", action.payload);

      const { tipId, comments } = action.payload;
      console.log("Received tipId:", tipId);

      state.comments = {
        ...state.comments,
        [tipId]: comments,
      };

      state.loading = false;
      state.error = null;
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteComment.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.loading = false;

      const {
        meta: {
          arg: { tipId, commentId },
        },
      } = action;

      // Provera da li comments objekat za dati tip postoji
      if (!state.comments[tipId]) {
        console.error(
          "Comments array is undefined or null for the specified tipId."
        );
        return;
      }

      const updatedComments = state.comments[tipId].filter(
        (comment) => comment._id !== commentId
      );

      state.comments = {
        ...state.comments,
        [tipId]: updatedComments,
      };
    },
    [deleteComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [markTipAsSuccess.fulfilled]: (state, action) => {
      // Ažurirajte stanje tipa u Redux-u nakon što se uspešno označi kao uspešan
      const updatedTip = action.payload;
      state.tip = updatedTip; // Ovo je samo primer, ažurirajte stanje prema vašim potrebama
    },
    [markTipAsFailed.fulfilled]: (state, action) => {
      // Ažurirajte stanje tipa u Redux-u nakon što se uspešno označi kao neuspešan
      const updatedTip = action.payload;
      state.tip = updatedTip; // Ovo je samo primer, ažurirajte stanje prema vašim potrebama
    },
  },
});

export default tipSlice.reducer;
