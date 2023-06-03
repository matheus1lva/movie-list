import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import MovieListPage from "./pages/MovieListPage/MovieListPage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MyLists from "./pages/MyLists/MyLists";
import { Box, CssBaseline, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { appWidth } from "./helpers/const/ui";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <BrowserRouter>
                <Wrapper>
                    <Routes>
                        <Route path="*" element={<MyLists />} />
                        <Route path="/lists/:id" element={<MovieListPage />} />
                    </Routes>
                </Wrapper>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;

function Wrapper({ children }: PropsWithChildren<{}>) {
    const padding = "30px";
    return (
        <Box
            sx={{
                backgroundColor: "gray",
                height: "100%",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    maxWidth: appWidth,
                    margin: "0 auto",
                    backgroundColor: "white",
                    height: "100%",
                }}
            >
                <div
                    id="modal"
                    style={{
                        maxWidth: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                />
                <Box
                    component="header"
                    sx={{
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        display: "flex",
                        padding: `20px ${padding}`,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <Typography variant="h2">Movie Ranker</Typography>
                    </Link>
                </Box>
                <Box sx={{ padding, minHeight: "90vh" }}>{children}</Box>
            </Box>
        </Box>
    );
}
