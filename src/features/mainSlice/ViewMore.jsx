import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SmallMovie from "../../Components/SmallMovie";
import SetPage from "../../Components/SetPage";
import useWidth from "../../UseWidth";
import { GET_NOW_PLAYING_MOVIES } from "../../quries";
import { useQuery } from "@apollo/client";

export default function ViewMore({ series }) {
  const width = useWidth();
  let initialLimit = 15;
  let wordLimit;
  if (width < 1250) {
    wordLimit = 150;
  }
  if (width < 1025) {
    initialLimit = 10;
  }
  if (width < 768) {
    initialLimit = 7;
  }
  if (width < 500) {
    initialLimit = 5;
  }

  const [movies, setMovies] = useState([]);
  const [limit, setLimit] = useState(initialLimit);
  const [page, setPage] = useState(1);
  const params = useParams();
  const { loading, error, data } = useQuery(GET_NOW_PLAYING_MOVIES, {
    variables: { series: series ? true : false, whatShow: params.genre, page },
  });
  let start = 0;

  useEffect(() => {
    if (!loading && !error) {
      setMovies(data.getNowPlayingMovies);
      window.scrollTo(0, 0);
    }
  }, [loading, data, page]);

  useEffect(() => {
    if (page === limit) {
      setLimit(limit + 4);
      start = start + 4;
    }
    if (page <= limit - initialLimit) {
      setLimit(limit - 4);
    }
  }, [page]);
  const reSetPage = () => {
    setPage(1);
    setLimit(initialLimit);
  };
  useEffect(() => {
    reSetPage();
  }, [width]);
  if (movies.length == 0 || loading) {
    return <h1>Loading</h1>;
  }

  let totalLength = movies.length ?? 1;
  let totalPagess = Array.from({ length: totalLength }, (_, index) => {
    const pageNumber = index + 1;
    return (
      <button
        key={pageNumber}
        className={`circle-button ${page === pageNumber ? "buttonActive" : ""}`}
        onClick={() => setPage(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  });

  const slicedTotal = totalPagess.slice(limit - initialLimit ?? 0, limit);

  return (
    <>
      <section className="viewNos">
        <SetPage
          page={page}
          setPage={setPage}
          totalPagess={slicedTotal}
          reSetPage={reSetPage}
        ></SetPage>
        {movies.map((movie) => {
          return (
            <SmallMovie
              key={movie.id}
              passed={movie}
              series={series}
            ></SmallMovie>
          );
        })}
        <SetPage
          page={page}
          setPage={setPage}
          totalPagess={slicedTotal}
          reSetPage={reSetPage}
        ></SetPage>
      </section>
    </>
  );
}
