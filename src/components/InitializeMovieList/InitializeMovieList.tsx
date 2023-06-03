import {
    Button,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { List } from "../../hooks/useMovieLists";

interface InitializeMovieListProps {
    onSubmit: (list: Omit<List, "id">) => void;
}

export default function InitializeMovieListForm({
    onSubmit,
}: InitializeMovieListProps) {
    const { register, handleSubmit, control } = useForm({
        defaultValues: { name: "", tags: [""] },
    });

    const handleFormSubmit = handleSubmit(({ tags, name }) => {
        onSubmit({ name, tags: tags.join(",") });
    });

    const genres = [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film-Noir",
    ];

    return (
        <form
            onSubmit={handleFormSubmit}
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "20px",
                gap: "20px",
            }}
        >
            <Typography variant="h2" component="h2" sx={{ width: "100%" }}>
                New List
            </Typography>
            <TextField
                {...register("name")}
                label="List Name"
                autoFocus
                fullWidth
            />
            <FormControl fullWidth variant="outlined">
                <InputLabel>Genres</InputLabel>
                <Controller
                    control={control}
                    name="tags"
                    render={({ field }) => {
                        return (
                            <Select
                                label="Genres"
                                style={{ width: "100%" }}
                                multiple
                                onClose={() => {
                                    field.onBlur();
                                }}
                                MenuProps={{
                                    variant: "menu",
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left",
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "left",
                                    },
                                }}
                                displayEmpty={true}
                                renderValue={(selected) => {
                                    return (
                                        selected
                                            ?.filter(
                                                (option) => !!option.length
                                            )
                                            .map((option) => (
                                                <Chip
                                                    label={option}
                                                    sx={{
                                                        marginLeft: "3px",
                                                    }}
                                                />
                                            )) || "Select some options"
                                    );
                                }}
                                {...field}
                            >
                                {genres.map((genre) => (
                                    <MenuItem key={genre} value={genre}>
                                        <Checkbox
                                            checked={
                                                field.value.indexOf(genre) >= 0
                                            }
                                        />
                                        <ListItemText primary={genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                        );
                    }}
                />
            </FormControl>
            <Button type="submit" variant="contained" size="large">
                Confirm
            </Button>
        </form>
    );
}
