import { RESTDataSource } from "@apollo/datasource-rest";

const API_TOKEN = process.env.TMDB_API_TOKEN;

export class MovieAPI extends RESTDataSource {
  baseURL = "https://api.themoviedb.org/3/";

  getNowPlayingMovies(series, whatShow, page = 1) {
    const queryParams = new URLSearchParams({
      language: "en-US",
      page: page.toString(),
    });

    let baseUrl = "";
    if (series && whatShow === "trending") {
      baseUrl = `trending/tv/week`;
    } else {
      baseUrl = `${series ? "tv" : "movie"}/${whatShow}`;
    }

    const query = `${baseUrl}?${queryParams.toString()}`;
    return this.get(query, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    });
  }

  getSearchResult(series, searchQuery) {
    const type = series === "series" ? "tv" : "movie";
    const query = `search/${type}?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=1`;
    return this.get(query, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    });
  }
}
