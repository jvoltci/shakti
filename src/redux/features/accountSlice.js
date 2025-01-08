import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Fetch accounts
export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  const response = await axios.get('/x/account');
  return response.data.data;
});

// Add account
export const addAccount = createAsyncThunk('accounts/addAccount', async (username, { rejectWithValue }) => {
  try {
    const response = await axios.post('/x/account', { username });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error adding account');
  }
});

// Delete account
export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (username, { rejectWithValue }) => {
  try {
    await axios.delete(`/x/account/${username}`);
    return username;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error deleting account');
  }
});

// Deactivate account
export const deactivateAccount = createAsyncThunk('accounts/deactivateAccount', async (username, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/x/account/${username}`, { active: false });
    return response.data.data; // Assuming the API returns the updated account
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error deactivating account');
  }
});

// Slice
const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    loading: false,
    error: null,
    accountLoading: {}, // Track loading state per account
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch accounts
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add account
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })

      // Delete account
      .addCase(deleteAccount.pending, (state, action) => {
        state.accountLoading[action.meta.arg] = true; // Set loading for specific account
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        delete state.accountLoading[action.meta.arg]; // Clear loading state
        state.accounts = state.accounts.filter((acc) => acc.username !== action.payload);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        delete state.accountLoading[action.meta.arg]; // Clear loading state
        state.error = action.error.message;
      })

      // Deactivate account
      .addCase(deactivateAccount.pending, (state, action) => {
        state.accountLoading[action.meta.arg] = true; // Set loading for specific account
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        delete state.accountLoading[action.meta.arg]; // Clear loading state
        const index = state.accounts.findIndex((acc) => acc.username === action.payload.username);
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        delete state.accountLoading[action.meta.arg]; // Clear loading state
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;
