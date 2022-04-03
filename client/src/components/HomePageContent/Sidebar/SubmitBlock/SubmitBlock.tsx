import React from 'react'
import SubmitBtn from '../../../../ui-kit/Buttons/SubmitBtn/SubmitBtn'
import { useDispatch, useSelector } from 'react-redux'
import { makeCalculation, getCalculatorInput, getCalculationStatus } from '../../../../store/calculator/calculatorSlice'
import { FetchStatus } from '../../../../ts/enums'
import checkInputValidity from '../../../../helpers/checkInputValidity'
import { ValidCalcInput } from '../../../../store/calculator/initialState'


const OperationsBlock = () => {
  const input = useSelector(getCalculatorInput)
  const status = useSelector(getCalculationStatus)
  const dispatch = useDispatch()

  const isLoading = status === FetchStatus.Pending
  const isDisabled = !checkInputValidity(input)


  const handleSubmitClick = () =>
    dispatch(makeCalculation(input as ValidCalcInput))

  return (
    <SubmitBtn
      isLoading={isLoading}
      onClick={handleSubmitClick}
      isDisabled={isDisabled}
    >
      =
    </SubmitBtn>
  )
}

export default OperationsBlock
