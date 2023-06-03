import { useQuery, useQueryClient } from "react-query";
import { createTMDBRequest } from "../helpers/api";
import useLocalStorage from "./useLocalStorage";
import { MovieDto } from "../models/movie";
import { List, useMovieLists } from "./useMovieLists";
import { useEffect, useMemo, useState } from "react";

export default function useMovieList(id: string) {
  const { lists, updateLists } = useMovieLists();
  const list = lists.find((list) => list.id === id);
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<MovieDto[]>([]); // Add this
  const offset = 5;
  const queryId = `movieList-${id}`;
  const { value, saveValue } = useLocalStorage(id);
  const queryClient = useQueryClient();
  const movieIds: string[] = useMemo(
    () => (value ? JSON.parse(value) : []),
    [value]
  );

  async function getMovies() {
    // paginate movies
    const movieIdsToFetch = movieIds
      .slice((page - 1) * offset, page * offset)
      .map((movieId) => createTMDBRequest(`/movie/${movieId}`));

    return Promise.all(movieIdsToFetch);
  }

  const { data, isLoading, refetch } = useQuery<MovieDto[]>(
    queryId,
    getMovies,
    {
      refetchOnWindowFocus: false,
      onSuccess: (newData) => {
        // On each successful fetch, add new movies to the end of allMovies
        setAllMovies((oldData) => [...oldData, ...newData]);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  function loadMore() {
    setPage(page + 1);
  }

  const hasMore = useMemo(() => {
    return movieIds.length > page * offset;
  }, [movieIds, page]);

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
    movies: allMovies, // Return allMovies instead of data
    isLoading,
    addMovies,
    reorderMovies,
    removeMovie,
    updateList,
    loadMore,
    movieIds,
    hasMore,
  };
}
