import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { calculate } from '../../api/calculator'
import { CalcReqBody, CalcErrorResponse, CalcSuccessfulResponse } from '../../../../common/types'
import { initialState } from './initialState'
import { FetchStatus } from '../../ts/enums'
import type { RootState } from '../store'

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
    },
    setOperation(state, { payload }) {
      state.input.action = payload
    },
    setNumber(state, { payload }) {
      state.result = null

      if (state.input.action && state.input.number1) {
        state.input.number2 += String(payload)

        return
      }

      state.input.number1 += String(payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeCalculation.pending, (state) => {
        state.calculationStatus = FetchStatus.Pending
      })
      .addCase(makeCalculation.fulfilled, (state, action) => {
        state.calculationStatus = FetchStatus.Idle
        state.result = (action.payload as CalcSuccessfulResponse).result
        state.input = initialState.input
      })
      .addCase(makeCalculation.rejected, (state, action) => {
        state.calculationStatus = FetchStatus.Rejected
        state.errorMessage = (action.payload as CalcErrorResponse).message
        state.input = initialState.input
      })
  }
})

export default calculatorSlice.reducer

export const { setOperation, setNumber, toggleConstructorMode } = calculatorSlice.actions

export const getResult = (state: RootState) => state.calculator.result
export const getCurrentMode = (state: RootState) => state.calculator.mode
export const getCalculatorInput = (state: RootState) => state.calculator.input
export const getCalculationStatus = (state: RootState) =>
  state.calculator.calculationStatus
