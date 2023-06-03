function getTMDBApiKey() {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    if (!apiKey) {
        throw new Error(
            "Please add the REACT_APP_TMDB_API_KEY to your .env.local"
        );
    }
    return apiKey as string;
}

export async function createTMDBRequest(
    path: string,
    searchParams: Record<string, string> = {}
) {
    const params = new URLSearchParams({
        api_key: getTMDBApiKey(),
        ...searchParams,
    }).toString();

    const url = process.env.REACT_APP_TMDB_API_HOST + path + "?" + params;

    const res = await fetch(url);
    return await res.json();
}
