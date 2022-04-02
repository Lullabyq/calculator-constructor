import { FetchStatus, ConstructorMode } from "../../ts/enums"

interface ReduxState {
  mode: ConstructorMode,
  displayedValue: number,
  calculationStatus: FetchStatus,
  errorMessage: string | null,
}

export const initialState: ReduxState = {
  mode: ConstructorMode.Constructor,
  displayedValue: 0,
  calculationStatus: FetchStatus.Idle,
  errorMessage: null
}
