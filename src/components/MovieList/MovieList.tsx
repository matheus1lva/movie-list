import { PropsWithChildren, useState } from "react";
import {
    DropResult,
    DragDropContext,
    Droppable,
    Draggable,
} from "react-beautiful-dnd";
import useMovieList from "../../hooks/useMovieList";
import Modal from "../Modal/Modal";

import SearchForm from "../SearchForm/SearchForm";
import { MovieDto } from "../../models/movie";
import Movie from "../Movie/Movie";
import { Link } from "react-router-dom";
import { Box, Breadcrumbs, Fab, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EmptyState from "../EmptyState/EmptyState";

interface MovieListProps {
    listId: string;
}

export default function MovieList({ listId }: MovieListProps) {
    const [isAddingMovie, setIsAddingMovie] = useState(false);

    const { movies, isLoading, addMovies, reorderMovies, removeMovie, list } =
        useMovieList(listId);

    function onDragEnd(result: DropResult) {
        if (
            !result.destination ||
            result.destination.index === result.source.index
        ) {
            return;
        }

        reorderMovies(result.source.index, result.destination.index);
    }

    function onAddMovie(movies: MovieDto[]) {
        addMovies(movies);
        setIsAddingMovie(false);
    }

    return (
        <>
            <Modal
                isOpen={isAddingMovie}
                onClose={() => setIsAddingMovie(false)}
            >
                <SearchForm onAddMovies={onAddMovie} />
            </Modal>
            {isLoading && <div>Loading...</div>}
            <Box
                sx={{
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Breadcrumbs>
                        <Typography variant="body1">
                            <Link to={"/"} style={{ textDecoration: "none" }}>
                                My Lists
                            </Link>
                        </Typography>
                        <Typography variant="body1">{list?.name}</Typography>
                    </Breadcrumbs>
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => setIsAddingMovie(true)}
                        sx={{ zIndex: 1 }}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
                {!movies?.length ? (
                    <EmptyState
                        heading="No Movies Yet!"
                        text="Click the plus button above to add movies to your list"
                    />
                ) : (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="list">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {movies?.map((movie, index) => (
                                        <DraggableElement
                                            id={movie.id}
                                            key={movie.id}
                                            index={index}
                                        >
                                            <Movie
                                                index={index}
                                                movie={movie}
                                                onDelete={() =>
                                                    removeMovie(movie.id)
                                                }
                                            />
                                        </DraggableElement>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </Box>
        </>
    );
}

function DraggableElement({
    id,
    index,
    children,
}: PropsWithChildren<{
    id: number;
    index: number;
}>) {
    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {children}
                </div>
            )}
        </Draggable>
    );
}
