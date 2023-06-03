import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useMovieSearch from "../../hooks/useMovieSearch";
import { MovieDto } from "../../models/movie";
import MovieSearchResult from "../MovieSearchResult/MovieSearchResult";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFormProps {
    onAddMovies: (movies: MovieDto[]) => void;
}

export default function SearchForm({ onAddMovies }: SearchFormProps) {
    const [selectedMovieIds, setSelectedMovieIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const results = useMovieSearch(searchTerm);

    function toggleInSelectedList(movieId: number) {
        if (selectedMovieIds?.includes(movieId)) {
            setSelectedMovieIds((current) =>
                current.filter((id) => id !== movieId)
            );
            return;
        }
        setSelectedMovieIds((current) => [...current, movieId]);
    }

    // Filters out movies selected from previous searches if the results update
    useEffect(() => {
        setSelectedMovieIds((existing) => {
            const existingIds = results.map((movie) => movie.id);
            return existing.filter((id) => existingIds.includes(id));
        });
    }, [results]);

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
                        disabled={selectedMovieIds.length === 0}
                        onClick={() =>
                            onAddMovies(
                                results.filter((movie) =>
                                    selectedMovieIds.includes(movie.id)
                                )
                            )
                        }
                    >
                        Add {selectedMovieIds.length} Movies
                    </Button>
                    <Button
                        onClick={() => setSelectedMovieIds([])}
                        size="large"
                        variant="contained"
                        disabled={selectedMovieIds.length === 0}
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
                        return (
                            <MovieSearchResult
                                key={movie.id}
                                movie={movie}
                                onSelect={() => toggleInSelectedList(movie.id)}
                                selected={selectedMovieIds.includes(movie.id)}
                            />
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}
