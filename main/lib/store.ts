import { configureStore } from '@reduxjs/toolkit'
import Slices from './features/Slices'

export const makeStore = () => {
  return configureStore({
    reducer: {
        data: Slices
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']