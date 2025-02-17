import { RESTDataSource } from "@apollo/datasource-rest";
// const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDgzYTdhN2M5YjhlZGNmN2RlZDYwNmU3ZjA5Mjg1NiIsIm5iZiI6MTY3NjczMTE0MS40MzkwMDAxLCJzdWIiOiI2M2YwZTMwNWEyNGM1MDAwODQ4YzkyZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0ps3nbsJzYSZFnBf4KKb8DmG6An5hzSe5SKyT5RsqdQ`,
  },
};
export class MovieAPI extends RESTDataSource {
  baseURL = "https://api.themoviedb.org/3/";

  getNowPlayingMovies(series, whatShow, page = 1) {
    let baseUrl = ``;
    let queryParams = new URLSearchParams({
      language: "en-US",
      page: page,
    });
    if (series && whatShow == "trending") {
      baseUrl = `trending/tv/week?language=en-US`;
    } else {
      baseUrl = `${series ? "tv" : "movie"}/${whatShow}?language=en-US`;
    }
    const query = `${baseUrl}?${queryParams.toString()}`;

    return this.get(query, options);
  }
  getSearchResult(series, searchQuery) {
    let query = `https://api.themoviedb.org/3/search/${series == "series" ? "tv" : "movie"}?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
    return this.get(query, options);
  }
}
