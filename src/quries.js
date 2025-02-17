import { gql } from "@apollo/client";

export const GET_BY_ID = gql`
  query GetById($series: Boolean!, $whatShow: String!) {
    getById(series: $series, whatShow: $whatShow) {
      ... on Series {
        name
        backdrop_path
        genre_ids
        id
        original_language
        overview
        number_of_seasons
        last_air_date
        poster_path
        number_of_episodes
        popularity
        vote_average
        vote_count
        first_air_date
        last_episode_to_air {
          id
          name
          overview
          vote_average
          vote_count
          air_date
          episode_number
          episode_type
          production_code
          runtime
          season_number
          show_id
          still_path
        }
        status
        genres {
          id
          name
        }
      }
      ... on Movie {
        title
        backdrop_path
        genre_ids
        id
        original_language
        original_title
        overview
        poster_path
        popularity
        release_date
        vote_average
        vote_count
        status
        genres {
          id
          name
        }
      }
    }
  }
`;
export const GET_NOW_PLAYING_MOVIES = gql`
  query GetNowPlayingMovies($series: Boolean!, $page: Int, $whatShow: String!) {
    getNowPlayingMovies(series: $series, page: $page, whatShow: $whatShow) {
      ... on Series {
        name
        backdrop_path
        genre_ids
        id
        original_language
        overview
        poster_path
        popularity
        number_of_episodes
        last_air_date
        vote_average
        number_of_seasons
        vote_count
        first_air_date
        last_episode_to_air {
          id
          name
          overview
          vote_average
          vote_count
          air_date
          episode_number
          episode_type
          production_code
          runtime
          season_number
          show_id
          still_path
        }
        status
        genres {
          id
          name
        }
      }
      ... on Movie {
        title
        backdrop_path
        genre_ids
        id
        original_language
        original_title
        overview
        poster_path
        popularity
        release_date
        vote_average
        vote_count
        status
        genres {
          id
          name
        }
      }
    }
  }
`;

export const GET_SEARCH_RESULT = gql`
  query GetSearchResult($series: String!, $searchQuery: String!) {
    getSearchResult(series: $series, searchQuery: $searchQuery) {
      ... on Series {
        name
        backdrop_path
        last_air_date
        genre_ids
        id
        number_of_seasons
        original_language
        overview
        poster_path
        number_of_episodes
        popularity
        vote_average
        vote_count
        first_air_date
        last_episode_to_air {
          id
          name
          overview
          vote_average
          vote_count
          air_date
          episode_number
          episode_type
          production_code
          runtime
          season_number
          show_id
          still_path
        }
        status
        genres {
          id
          name
        }
      }
      ... on Movie {
        title
        backdrop_path
        genre_ids
        id
        original_language
        original_title
        overview
        poster_path
        popularity
        release_date
        vote_average
        vote_count
        status
        genres {
          id
          name
        }
      }
    }
  }
`;
