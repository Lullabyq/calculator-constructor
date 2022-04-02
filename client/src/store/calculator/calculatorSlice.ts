import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { calculate } from '../../api/calculator'
import { CalcReqBody, CalcErrorResponse, CalcSuccessfulResponse } from '../../../../common/types'
import { initialState } from './initialState'
import { FetchStatus } from '../../ts/enums'

export const makeCalculation = createAsyncThunk(
  'calculator/makeCalculation',
  async (body: CalcReqBody) => {
    const response = await calculate(body)

    return response.data
  }
)

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    toggleConstructorMode(state, { payload }) {
      state.mode = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeCalculation.pending, (state) => {
        state.calculationStatus = FetchStatus.Pending
      })
      .addCase(makeCalculation.fulfilled, (state, action) => {
        state.calculationStatus = FetchStatus.Idle
        state.displayedValue = (action.payload as CalcSuccessfulResponse).result
      })
      .addCase(makeCalculation.rejected, (state, action) => {
        state.calculationStatus = FetchStatus.Rejected
        state.errorMessage = (action.payload as CalcErrorResponse).message
      })
  }
})


export default calculatorSlice.reducer
