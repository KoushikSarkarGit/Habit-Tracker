import { configureStore } from '@reduxjs/toolkit'
import habitsReducer from './habit_slice'

export const store = configureStore({
    reducer: {
        habitList: habitsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;