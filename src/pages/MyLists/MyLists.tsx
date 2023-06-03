import { List, useMovieLists } from "../../hooks/useMovieLists";
import { useNavigate } from "react-router-dom";
import { Box, Chip, Fab, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import InitializeMovieListForm from "../../components/InitializeMovieList/InitializeMovieList";

export default function MyLists() {
    const { lists: myLists, addList, removeList } = useMovieLists();
    const navigate = useNavigate();
    const [isCreatingNewList, setIsCreatingNewList] = useState(false);

    function onInitialize(list: Omit<List, "id">) {
        addList(list);
        setIsCreatingNewList(false);
    }

    return (
        <div>
            <Modal
                isOpen={isCreatingNewList}
                onClose={() => setIsCreatingNewList(false)}
            >
                <InitializeMovieListForm onSubmit={onInitialize} />
            </Modal>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="body1">My Lists</Typography>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setIsCreatingNewList(true)}
                    sx={{ zIndex: 1 }}
                >
                    <AddIcon />
                </Fab>
            </Box>
            {!myLists.length ? (
                <EmptyState
                    heading="No Lists Yet!"
                    text="Use the plus button above to add lists"
                />
            ) : (
                myLists.map((list) => (
                    <Paper
                        component={"a"}
                        key={list.id}
                        onClick={() => {
                            navigate(`/lists/${list.id}`);
                        }}
                        elevation={3}
                        sx={{
                            padding: "20px",
                            margin: "20px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="div" variant="h5">
                            {list.name}
                            {list.tags
                                .split(",")
                                .map(
                                    (tag) =>
                                        tag && (
                                            <Chip
                                                label={tag}
                                                sx={{ marginLeft: "10px" }}
                                            />
                                        )
                                )}
                        </Typography>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                removeList(list.id);
                            }}
                        >
                            <DeleteIcon sx={{ color: "gray" }} />
                        </IconButton>
                    </Paper>
                ))
            )}
        </div>
    );
}
