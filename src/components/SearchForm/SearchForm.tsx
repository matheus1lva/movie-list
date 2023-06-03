import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useMovieSearch from "../../hooks/useMovieSearch";
import { MovieDto } from "../../models/movie";
import MovieSearchResult from "../MovieSearchResult/MovieSearchResult";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFormProps {
  onAddMovies: (movies: MovieDto[]) => void;
  selectedMovies?: MovieDto[];
}

export default function SearchForm({
  onAddMovies,
  selectedMovies: initialSelectedMovies,
}: SearchFormProps) {
  const [selectedMovies, setSelectedMovies] = useState<MovieDto[]>(
    initialSelectedMovies ?? []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const results = useMovieSearch(searchTerm);

  function toggleInSelectedList(movie: MovieDto) {
    const foundMovie = selectedMovies.find((m) => m.id === movie.id);
    if (foundMovie) {
      setSelectedMovies((current) => current.filter((m) => m.id !== movie.id));
    } else {
      setSelectedMovies((current) => [...current, movie]);
    }
  }

  const newMovies = useMemo(() => {
    return selectedMovies.filter((movie) => {
      return !initialSelectedMovies?.find((m) => m.id === movie.id);
    });
  }, [initialSelectedMovies, selectedMovies]);

  function handleAddMovies() {
    onAddMovies(newMovies);
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",

        height: "80vh",
        overflow: "scroll",
        top: "0",
      }}
    >
      <Typography variant="h2" component="h2">
        Movie Search
      </Typography>
      <Box
        sx={{
          padding: "1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          backgroundColor: "white",
          marginBottom: "10px",
          height: "60px",
          top: 0,
        }}
      >
        <TextField
          autoFocus
          variant="outlined"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            margin: "10px",
            borderRadius: "50%",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            gap: "0 10px",
          }}
        >
          <Button
            size="large"
            variant="contained"
            disabled={false}
            onClick={handleAddMovies}
          >
            Add {newMovies.length} Movies
          </Button>
          <Button
            onClick={() => setSelectedMovies([])}
            size="large"
            variant="contained"
            disabled={selectedMovies.length === 0}
          >
            Clear Selection
          </Button>
        </Box>
      </Box>
      {results.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {results.map((movie) => {
            const findMovie = selectedMovies.find((m) => m.id === movie.id);
            return (
              <MovieSearchResult
                key={movie.id}
                movie={movie}
                onSelect={() => toggleInSelectedList(movie)}
                selected={findMovie != null}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
