import React, { useEffect, useState } from "react";
import SwiperCom from "./Swiper";
import { SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_NOW_PLAYING_MOVIES } from "../quries";

export default function NowPlaying({ whatShow, series }) {
  const [movies, setMovies] = useState([]);
  const { loading, error, data } = useQuery(GET_NOW_PLAYING_MOVIES, {
    variables: { series: series ? true : false, whatShow: whatShow },
  });
  useEffect(() => {
    if (!loading && !error) {
      setMovies(data.getNowPlayingMovies);
    }
  }, [loading]);

  if (loading || !movies) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>An Error has occured, couldn't fetch movies info.</h1>;
  }

  return (
    <SwiperCom>
      {movies.map((movie) => {
        const {
          title,
          poster_path,
          backdrop_path,
          overview,
          popularity,
          release_date,
          vote_average,
          vote_count,
          id,
        } = movie;
        return (
          <SwiperSlide key={id}>
            <div className="swipperContent">
              <h1 className="movieTitle">{title}</h1>
              <Link to={`${series ? "/series" : "movies"}/${id}`}>
                <img
                  className="movieImg"
                  src={`https://image.tmdb.org/t/p/w780/${poster_path}`}
                  alt=""
                />
              </Link>
              <p className="avgt"> Vote: {vote_average}</p>
              {/* {release_date.split("-")[0]} */}
            </div>
          </SwiperSlide>
        );
      })}
    </SwiperCom>
  );
}
