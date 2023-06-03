import { useParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function MovieListPage() {
    const { id } = useParams();
    return <MovieList listId={id as string} />;
}
