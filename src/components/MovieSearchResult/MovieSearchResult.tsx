import { Card, CardMedia, Typography } from "@mui/material";
import { getPosterPath } from "../../helpers/movie";
import { MovieDto } from "../../models/movie";

interface MovieSearchResultProps {
    movie: MovieDto;
    selected?: boolean;
    onSelect: () => void;
}

export default function MovieSearchResult({
    movie,
    selected = false,
    onSelect,
}: MovieSearchResultProps) {
    return (
        <Card
            onClick={onSelect}
            sx={{
                overflow: "hidden",
                outline: selected ? "4px solid #3f51b5" : "none",
            }}
        >
            <CardMedia
                sx={{ width: 200, height: 300 }}
                image={getPosterPath(movie)}
                title={movie.title + " poster"}
            />
            <Typography
                variant="body2"
                sx={{
                    textAlign: "center",
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0 20px",
                }}
            >
                {movie.title}
            </Typography>
        </Card>
    );
}
