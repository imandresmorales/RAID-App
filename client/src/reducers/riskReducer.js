import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import riskService from "../services/risk"

export const fetchRisks = createAsyncThunk(
  'risks/fetchAll',
  async (projectId, thunkAPI) => {
    try {
      const risks = await riskService.getAll(projectId)
      console.log('Fetched risks:', risks);
      return risks
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
  async ({ riskId, projectId, updateRiskData }, thunkAPI) => {
    try {
      return await riskService.updateRisk(projectId, riskId, updateRiskData)
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
        console.log('Risk created with payload:', action.payload);
        state.risks = [...state.risks, action.payload]
      })

      // Update
      .addCase(updateRisk.fulfilled, (state, action) => {
        console.log('Risk updated with payload:', action.payload);
        const updated = action.payload
        state.risks = state.risks.map((risk) => risk.id !== updated.id ? risk : updated)
      })

      // Delete
      .addCase(deleteRisk.fulfilled, (state, action) => {
        console.log('Risk deleted with payload:', action.payload);
        state.risks = state.risks.filter((risk) => risk.id !== action.payload.id)
      })
  }
})


export default riskSlice.reducer