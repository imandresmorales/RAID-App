import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import riskService from "../services/risk"

export const fetchRisks = createAsyncThunk(
  'risks/fetchAll',
  async (projectId, thunkAPI) => {
    try {
      return await riskService.getAll(projectId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createRisk = createAsyncThunk(
  'risks/create',
  async ({ projectId, newRisk }, thunkAPI) => {
    try {
      return await riskService.createRisk(projectId, newRisk)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
export const updateRisk = createAsyncThunk(
  'risks/update',
  async ({ riskId, updateRiskData }, thunkAPI) => {
    try {
      return await riskService.updateRisk(riskId, updateRiskData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
export const deleteRisk = createAsyncThunk(
  'risks/delete',
  async (riskId, thunkAPI) => {
    try {
      return await riskService.deleteRisk(riskId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  items: [],
  loading: false,
  error: null
}

const riskSlice = createSlice({
  name: "risks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRisks.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRisks.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchRisks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Create
      .addCase(createRisk.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload]
      })

      // Update
      .addCase(updateRisk.fulfilled, (state, action) => {
        const updated = action.payload
        state.items = state.items.map((risk) => risk.id !== updated.id ? risk : updated)
      })

      // Delete
      .addCase(deleteRisk.fulfilled, (state, action) => {
        state.items = state.items.filter((risk) => risk.id !== action.payload)
      })
  }
})


export default riskSlice.reducer