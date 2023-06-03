import { useQuery, useQueryClient } from "react-query";
import { createTMDBRequest } from "../helpers/api";
import useLocalStorage from "./useLocalStorage";
import { MovieDto } from "../models/movie";
import { List, useMovieLists } from "./useMovieLists";

export default function useMovieList(id: string) {
    const { lists, updateLists } = useMovieLists();
    const list = lists.find((list) => list.id === id);

    const queryId = `movieList-${id}`;
    const { value, saveValue } = useLocalStorage(id);
    const queryClient = useQueryClient();
    const movieIds: string[] = value ? JSON.parse(value) : [];
    const { data, isLoading } = useQuery<MovieDto[]>(queryId, getMovies);

    async function getMovies() {
        const responses = movieIds.map(async (id) =>
            createTMDBRequest(`/movie/${id}`)
        );

        return Promise.all(responses);
    }

    function updateMovies(state: MovieDto[]) {
        const updated = queryClient.setQueryData(queryId, () => state);
        saveValue(JSON.stringify(updated.map((movie) => movie.id)));
    }

    function addMovies(newMovies: MovieDto[]) {
        updateMovies([...(data || []), ...newMovies]);
    }

    function reorderMovies(startIndex: number, endIndex: number) {
        const updated = [...(data || [])];
        const [removed] = updated.splice(startIndex, 1);
        updated.splice(endIndex, 0, removed);

        updateMovies(updated);
    }

    function removeMovie(movieId: number) {
        const updated = [...(data || [])];
        updateMovies(updated.filter((movie) => movie.id !== movieId));
    }

    function updateList(updatedList: List) {
        updateLists(
            lists.map((list) => {
                return list.id !== id ? list : { ...list, ...updatedList };
            })
        );
    }

    return {
        list,
        movies: data,
        isLoading,
        addMovies,
        reorderMovies,
        removeMovie,
        updateList,
    };
}
