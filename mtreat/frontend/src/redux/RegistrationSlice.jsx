import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerPatient = createAsyncThunk(
  "registration/registerPatient",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/patients/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: { loading: false, success: null, error: null },
  reducers: { resetState: (state) => ({ loading: false, success: null, error: null }) },
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerPatient.fulfilled, (state) => { state.loading = false; state.success = "Registration successful!"; })
      .addCase(registerPatient.rejected, (state, action) => { state.loading = false; state.error = action.payload || "An error occurred."; });
  },
});

export const { resetState } = registrationSlice.actions;
export default registrationSlice.reducer;
