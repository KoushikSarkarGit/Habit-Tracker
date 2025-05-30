import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Habit {
    id: string,
    name: string,
    frequency: "daily" | "weekly",
    completedDates: string[],
    createdAt: string
}

interface HabitState {
    HabitList: Habit[]
}

const initialState: HabitState = {
    HabitList: []
}

const habitslice = createSlice({
    name: 'habit',
    initialState,
    reducers: {
        addHabit: (
            state,
            action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
        ) => {
            const newhabit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toISOString()

            }

            state.HabitList.push(newhabit);
        },

        removeHabit: (
            state,
            action: PayloadAction<{ id: string }>
        ) => {

            state.HabitList = state.HabitList.filter((item) => item.id !== action.payload.id)

        },

        toggleCompletion: (state,
            action: PayloadAction<{ id: string }>
        ) => {
            const date = new Date().toISOString().split("T")[0];
            const habit = state.HabitList.find((item) => item.id == action.payload.id);
            if (habit) {
                const index = habit.completedDates.indexOf(date);
                if (index > -1) {
                    habit.completedDates.splice(index, 1);
                } else {

                    habit.completedDates.push(date);
                }
            }
        }
    }
})

export const { addHabit, removeHabit, toggleCompletion } = habitslice.actions
export default habitslice.reducer;