import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectService from "../services/project"

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await projectService.getAll()
      console.log('Projects from API:', res);
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/create',
  async (newProject, thunkAPI) => {
    try {
      return await projectService.create(newProject)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      return await projectService.update(id, updatedData)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, thunkAPI) => {
    try {
      await projectService.deleteProject(id)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)
const initialState = {
  items: [],
  loading: false,
  error: null
}
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.
      addCase(fetchProjects.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createProject.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload]
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map(project =>
          project.id !== updated.id ? project : updated
        );
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})


export default projectSlice.reducer