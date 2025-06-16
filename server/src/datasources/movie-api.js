import { RESTDataSource } from "@apollo/datasource-rest";

const API_TOKEN = process.env.TMDB_API_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDgzYTdhN2M5YjhlZGNmN2RlZDYwNmU3ZjA5Mjg1NiIsIm5iZiI6MTY3NjczMTE0MS40MzkwMDAxLCJzdWIiOiI2M2YwZTMwNWEyNGM1MDAwODQ4YzkyZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0ps3nbsJzYSZFnBf4KKb8DmG6An5hzSe5SKyT5RsqdQ'
  }
};
export class MovieAPI extends RESTDataSource {
  baseURL = "https://api.themoviedb.org/3/";

  getNowPlayingMovies(series, whatShow, page = 1) {

    const queryParams = new URLSearchParams({
      language: "en-US",
      page: page.toString(),
    });
    console.log("Sending request with token:", API_TOKEN);

    let baseUrl = "";
    if (series && whatShow === "trending") {
      baseUrl = `trending/tv/week`;
    } else {
      baseUrl = `${series ? "tv" : "movie"}/${whatShow}`;
    }

    const query = `${baseUrl}?${queryParams.toString()}`;
    return this.get(query, options);
  }

  getSearchResult(series, searchQuery) {

    const type = series === "series" ? "tv" : "movie";
    const query = `search/${type}?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=1`;
    return this.get(query, options);
  }
}
