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
  async ({ projectId, riskId }, thunkAPI) => {
    if (!riskId || !projectId) {
      return thunkAPI.rejectWithValue("Invalid projectId or riskId");
    }
    try {
      return await riskService.deleteRisk(projectId, riskId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  risks: [],
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
        state.risks = action.payload
        state.loading = false
      })
      .addCase(fetchRisks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Create
      .addCase(createRisk.fulfilled, (state, action) => {
        state.risks = [...state.risks, action.payload]
      })

      // Update
      .addCase(updateRisk.fulfilled, (state, action) => {
        const updated = action.payload
        state.risks = state.risks.map((risk) => risk.id !== updated.id ? risk : updated)
      })

      // Delete
      .addCase(deleteRisk.fulfilled, (state, action) => {
        state.risks = state.risks.filter((risk) => risk.id !== action.payload.id)
      })
  }
})


export default riskSlice.reducer