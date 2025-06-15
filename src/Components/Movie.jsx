import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
import { useQuery } from "@apollo/client";
import { GET_BY_ID } from "../quries";

export default function Movie({ series }) {
  const [movies, setMovies] = useState([]);
  const [rating, setRating] = useState("");
  const params = useParams();
  const show = useSelector((state) => state.movies.show);

  const { loading, error, data } = useQuery(GET_BY_ID, {
    variables: { series: series ? true : false, whatShow: `${params.id}` },
  });

  useEffect(() => {
    if (!loading && !error) {
      setMovies(data.getById);
    }
  }, [loading, params, show]);

  const getImdp = async (rat) => {
    const API_TOKEN = import.meta.env.VITE_IMDP_API_TOKEN;

    const url = `https://imdb236.p.rapidapi.com/imdb/${rat}/rating`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${API_TOKEN.toString()}`,
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setRating(result.averageRating);
    } catch (error) {}
  };
  if (error) {
    return (
      <h1>
        An Error has occured, couldn't fetch {series ? "series" : "movie"} info.
      </h1>
    );
  }
  if (loading || movies.length == 0) {
    return <h1>Loading...</h1>;
  }

  let comGenre = "";
  movies.genres?.forEach((gene) => {
    comGenre = comGenre + ", " + gene.name;
  });

  let depenIs;
  if (!series) {
    const {
      genres,
      title,
      poster_path,
      popularity,
      release_date,
      homepage: netflix,
      imdb_id: imdp,
      production_companies,
      status,
      origin_country,
      overview,
      runtime,
      vote_average,
      tagline,
    } = movies;
    depenIs = (
      <section className="oneMovie">
        <header>
          <img
            className="movieImg"
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt=""
          />
        </header>
        <article className="movieArticle">
          <h1 className="movieTitle noMoviesTitle">{title}</h1>
          <p className="moviePara">{overview}</p>
          <h4>Genres: {comGenre.slice(1)}</h4>
          {runtime && <h4 className="runTime"> run-time: {runtime} mintues</h4>}
          <h4>average TMDP rating: {vote_average}</h4>
          {rating && <h4>IMDP Rating: {rating}</h4>}

          <h4 className="moviePop">popularity: {popularity}</h4>
          <h4 className="releaseDate">release date: {release_date}</h4>
          <h4>status: {status}</h4>
          <Link
            className="dp"
            target="_blank"
            to={`https://www.imdb.com/title/${imdp}`}
          >
            <img src="/IMDb_Logo.png" alt="" />
          </Link>
          <h3 className="TagLine">{tagline}</h3>
        </article>
      </section>
    );
  } else {
    const {
      backdrop_path,
      created_by,
      episode_run_time,
      first_air_date,
      genres,
      homepage,
      id,
      in_production,
      languages,
      last_air_date,
      last_episode_to_air,
      name,
      next_episode_to_air,
      networks,
      number_of_episodes,
      number_of_seasons,
      origin_country,
      original_language,
      original_name,
      overview,
      popularity,
      poster_path,
      production_companies,
      production_countries,
      seasons,
      spoken_languages,
      status,
      tagline,
      type,
      vote_average,
      vote_count,
    } = movies;

    const {
      id: episodeID,
      name: episodeName,
      overview: epsOv,
      vote_average: epsVa,
      vote_count: epsVc,
      air_date,
      episode_number,
      episode_type,
      production_code,
      runtime,
      season_number,
      show_id,
      still_path,
    } = last_episode_to_air;
    depenIs = (
      <section className="oneMovie oneSeries">
        <header>
          <img
            className="movieImg"
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt=""
          />
        </header>
        <article className="movieArticle">
          <h1 className="movieTitle">{name}</h1>
          <p className="moviePara">{overview}</p>
          <h4>Genres: {comGenre.slice(1)}</h4>
          <h4>number of seasons: {number_of_seasons}</h4>
          <h4>number of episodes:{number_of_episodes}</h4>
          <h4>average TMDP rating: {vote_average}</h4>
          <h4 className="moviePop">popularity: {popularity}</h4>
          <div className="airDates">
            <h4 className="releaseDate">first air date: {first_air_date}</h4>
            <h4 className="releaseDate">last air date: {last_air_date}</h4>
          </div>
          <h4>last episode to air</h4>
          <div className="lastEpisodeToAir">
            <h4>Title: {episodeName}</h4>
            <h4>average vote:{vote_average}</h4>
            <h4>air date:{air_date}</h4>
            <h4>season number:{season_number}</h4>
            <h4>episode number:{episode_number}</h4>
            <h4>episode type: {episode_type}</h4>
          </div>
          <h4>status: {status}</h4>

          <h3 className="TagLine">{tagline}</h3>
        </article>
      </section>
    );
  }

  return <>{depenIs}</>;
}
