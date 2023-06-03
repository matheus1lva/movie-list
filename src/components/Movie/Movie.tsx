import {
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Typography,
} from "@mui/material";
import { getPosterPath } from "../../helpers/movie";
import { MovieDto } from "../../models/movie";
import DeleteIcon from "@mui/icons-material/Delete";

interface MovieDisplayProps {
    movie: MovieDto;
    index: number;
    onDelete: () => void;
}

export default function Movie({ movie, index, onDelete }: MovieDisplayProps) {
    return (
        <Card
            elevation={6}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                position: "relative",
                overflow: "visible",
                padding: "20px",
                margin: "60px 0",
                height: "280px",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    margin: "-40px auto 0",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        minWidth: 40,
                        transform: "translate(-20px, -20px)",
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                    }}
                >
                    {index + 1}
                </Box>
                <img
                    src={getPosterPath(movie)}
                    alt={movie.title + " poster"}
                    style={{
                        boxShadow: "0px 0px 7px #ccc",
                        width: 180,
                    }}
                />
            </Box>
            <CardContent
                sx={{
                    position: "relative",
                    width: "100%",
                    objectFit: "cover",
                    maxHeight: "250px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        overflow: "hidden",
                        height: "100%",
                    }}
                >
                    <Typography variant="h3" component="div">
                        {movie.title}
                    </Typography>
                    <Box
                        sx={{
                            margin: "10px 0",
                        }}
                    >
                        {movie.genres?.map((genre) => (
                            <Chip
                                label={genre.name}
                                key={genre.id}
                                sx={{ marginLeft: "4px" }}
                            />
                        ))}
                    </Box>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            height: "7.5em",
                            maxHeight: "100%",
                            lineHeight: "1.5em",
                            overflow: "hidden",
                        }}
                    >
                        {movie.overview}
                    </Typography>
                </Box>
                <IconButton
                    onClick={onDelete}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}
                >
                    <DeleteIcon
                        sx={{
                            color: "gray",
                        }}
                    />
                </IconButton>
            </CardContent>
        </Card>
    );
}
