import { MovieDto } from "../models/movie";

const IMAGE_API_URL = "https://image.tmdb.org/t/p/original";

export function getPosterPath(movie: MovieDto) {
    const ALTERNATE_IMAGE_PATH =
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

    if (!movie.poster_path) {
        return ALTERNATE_IMAGE_PATH;
    }

    return IMAGE_API_URL + movie.poster_path;
}

export function getBackgroundPath(movie: MovieDto) {
    return IMAGE_API_URL + movie.backdrop_path;
}
