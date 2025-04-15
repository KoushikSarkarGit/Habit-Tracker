import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
    Box,
    Typography,
    Button,
    LinearProgress,
    Paper,
    Grid,
} from "@mui/material";
import { Habit, removeHabit, toggleCompletion } from '../store/habit_slice';

const ListHabit: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const today = new Date().toISOString().split("T")[0];;
    const habits = useSelector((state: RootState) => state.habitList.HabitList);

    const getStreak = (completedDates: string[]) => {
        let streak = 0;
        const currdate = new Date()

        for (let i = 0; i < completedDates.length; i++) {
            if (completedDates.includes(currdate.toISOString().split("T")[0])) {
                streak++;
                currdate.setDate(currdate.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
            {habits.map((habit: Habit) => (
                <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
                    <Grid container alignItems="center">
                        <Grid size={{ xs: 6, md: 8 }}>
                            <Typography variant="h6">{habit.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {habit.frequency.charAt(0).toUpperCase() +
                                    habit.frequency.slice(1)}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 8 }} >
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    color={
                                        habit.completedDates.includes(today) ? "success" : "primary"
                                    }
                                    onClick={() =>
                                        dispatch(toggleCompletion({ id: habit.id }))
                                    }
                                    startIcon={<CheckCircleIcon />}
                                >
                                    {habit.completedDates.includes(today)
                                        ? "Completed"
                                        : "Mark Complete"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => dispatch(removeHabit({ id: habit.id }))}
                                    startIcon={<DeleteIcon />}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            Current Streak: {getStreak(habit.completedDates)} days
                            Current Streak: days
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={(getStreak(habit.completedDates) / 30) * 100}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Paper>
            ))}
        </Box>
    )
}


export default ListHabit;