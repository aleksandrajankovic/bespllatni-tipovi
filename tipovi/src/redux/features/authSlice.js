import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { getState, rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      const user = response.data;

      // Check if the user is unverified
      if (user.status === "unverified") {
        toast.error("Account not verified. Please check your email.");
        return rejectWithValue({ message: "Account not verified" });
      }

      toast.success("Uspešno ste se ulogovali!");
      navigate("/");
      return user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast, dispatch }, { rejectWithValue }) => {
    try {
      console.log("Registering user...");
      const response = await api.signUp(formValue);
      toast.success("Uspešno ste se registrovali!");
      navigate("/login");
      return response.data;
    } catch (err) {
      console.error("Error in register action:", err);
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.verifyAccount(token);
      console.log("Verify Account Response:", response);
      return response.data;
    } catch (err) {
      console.error("Error verifying account:", err);
      return rejectWithValue(err.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
    verificationMessage: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      const user = action.payload;

      if (user.status === "unverified") {
        state.error = "Account not verified";
      } else {
        localStorage.setItem("profile", JSON.stringify({ ...user }));
        state.user = user;
      }
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [verifyAccount.pending]: (state, action) => {
      state.loading = true;
    },
    [verifyAccount.fulfilled]: (state, action) => {
      if (state.user) {
        state.user.status = "verified";
      }
      state.verificationMessage = "Vaš nalog je uspešno verifikovan!";
    },
    [verifyAccount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : "Unknown error";
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
