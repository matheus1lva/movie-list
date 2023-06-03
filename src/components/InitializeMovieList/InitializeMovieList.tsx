import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { List } from "../../hooks/useMovieLists";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface InitializeMovieListProps {
  onSubmit: (list: Omit<List, "id">) => void;
}

const schema = yup.object().shape({
  name: yup.string().min(5),
  tags: yup.array().of(yup.string().required()).min(2, "Must select 2 genres"),
});

export default function InitializeMovieListForm({
  onSubmit,
}: InitializeMovieListProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    name: string;
    tags: string[];
  }>({
    defaultValues: { name: "", tags: [] },
    resolver: yupResolver(schema),
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
        error={errors.name != null}
        helperText={errors.name?.message}
      />
      <FormControl fullWidth variant="outlined" error={errors.tags != null}>
        <InputLabel>Genres</InputLabel>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => {
            return (
              <Select
                data-testid="genres-select"
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
                      ?.filter((option) => !!option.length)
                      .map((option) => (
                        <Chip
                          label={option}
                          data-testid={`genre-chip-${option}`}
                          sx={{
                            marginLeft: "3px",
                          }}
                        />
                      )) || "Select some options"
                  );
                }}
                {...field}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre} value={genre}>
                      <Checkbox
                        checked={
                          field.value ? field.value.indexOf(genre) >= 0 : false
                        }
                      />
                      <ListItemText primary={genre} />
                    </MenuItem>
                  );
                })}
              </Select>
            );
          }}
        />
        {errors.tags && <FormHelperText>{errors.tags?.message}</FormHelperText>}
      </FormControl>
      <Button type="submit" variant="contained" size="large">
        Confirm
      </Button>
    </form>
  );
}
