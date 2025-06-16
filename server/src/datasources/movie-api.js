import "dotenv/config";
import { RESTDataSource } from "@apollo/datasource-rest";
import 'dotenv/config';

const API_TOKEN = process.env.TMDB_API_TOKEN; // Use process.env, not import.meta.env

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
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
    if (series && whatShow === "trending") {
      baseUrl = `trending/tv/week?language=en-US`;
    } else {
      baseUrl = `${series ? "tv" : "movie"}/${whatShow}?language=en-US`;
    }
    const query = `${baseUrl}?${queryParams.toString()}`;

    return this.get(query, options);
  }
  getSearchResult(series, searchQuery) {
    let query = `https://api.themoviedb.org/3/search/${series === "series" ? "tv" : "movie"}?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
    return this.get(query, options);
  }
}
