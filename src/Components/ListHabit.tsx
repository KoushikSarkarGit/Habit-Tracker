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
import { removeHabit } from '../store/habit_slice';

const ListHabit: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const date = new Date;
    const today = date.getDay();
    const habits = useSelector((state: RootState) => state.habitList.HabitList);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
            {habits.map((habit: any) => (
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
                                    // onClick={() =>
                                    //     dispatch(toggleHabit({ id: habit.id, date: today }))
                                    // }
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
                            {/* Current Streak: {getStreak(habit)} days */}
                            Current Streak: days
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            // value={(getStreak(habit) / 30) * 100}
                            value={40}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Paper>
            ))}
        </Box>
    )
}


export default ListHabit;