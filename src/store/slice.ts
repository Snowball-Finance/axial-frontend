import { createSlice } from "./toolkit"
interface ContainerState {
  loggedIn: boolean
}
// The initial state of the LoginPage container
export const initialState: ContainerState = {
  loggedIn: false,
}

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
})

export const {
  actions: globalActions,
  reducer: globalReducer,
  name: sliceKey,
} = globalSlice
