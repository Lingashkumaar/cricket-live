import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLiveMatches, getMatchDetails, getMatchScorecard } from '../api/cricket';

const initialState = {
  liveMatches: [],
  selectedMatch: null,
  scorecard: null,
  loading: false,
  error: null,
};

// Define async thunks first
export const fetchLiveMatches = createAsyncThunk(
  'scores/fetchLiveMatches',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getLiveMatches();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMatchDetails = createAsyncThunk(
  'scores/fetchMatchDetails',
  async (matchId, { rejectWithValue }) => {
    try {
      const data = await getMatchDetails(matchId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchScorecard = createAsyncThunk(
  'scores/fetchScorecard',
  async (matchId, { rejectWithValue }) => {
    try {
      const data = await getMatchScorecard(matchId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchLiveMatches
      .addCase(fetchLiveMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveMatches.fulfilled, (state, action) => {
        state.liveMatches = action.payload;
        state.loading = false;
      })
      .addCase(fetchLiveMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchMatchDetails
      .addCase(fetchMatchDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.selectedMatch = action.payload;
        state.loading = false;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchScorecard
      .addCase(fetchScorecard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScorecard.fulfilled, (state, action) => {
        state.scorecard = action.payload;
        state.loading = false;
      })
      .addCase(fetchScorecard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError, clearError } = scoreSlice.actions;
export default scoreSlice.reducer;