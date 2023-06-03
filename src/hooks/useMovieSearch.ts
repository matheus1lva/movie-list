import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { createTMDBRequest } from "../helpers/api";
import { MovieDto } from "../models/movie";

export default function useMovieSearch(term: string) {
    const [results, setResults] = useState<MovieDto[]>([]);

    const searchMovieDb = useCallback(async (query: string) => {
        const path = "/search/movie";
        const data = await createTMDBRequest(path, { query });
        setResults(data.results);
    }, []);

    const debouncedSearchMovie = useMemo(
        () => _.debounce(searchMovieDb, 300),
        [searchMovieDb]
    );

    useEffect(() => {
        if (term.length > 0) {
            debouncedSearchMovie(term);
        }
        return () => debouncedSearchMovie.cancel();
    }, [term, debouncedSearchMovie]);

    return results;
}
