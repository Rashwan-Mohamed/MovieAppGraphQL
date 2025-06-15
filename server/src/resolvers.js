export const resolvers = {
  MovieResult: {
    __resolveType(obj, contextValue, info) {
      // Use the 'isSeries' flag to decide if it's a movie or series
      if (obj.name) {
        return "Series";
      }
      return "Movie"; // Default to 'Movie' if it's not a series
    },
  },
  Query: {
    getNowPlayingMovies: async (
      _,
      { series, whatShow, page },
      { dataSources }
    ) => {
      let hasPage = "";
      if (!page) {
        hasPage = 1;
      } else {
        hasPage = page;
      }
      try {
        const data = await dataSources.movieAPI.getNowPlayingMovies(
          series,
          whatShow,
          hasPage
        );
        return data.results;
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
        return [];
      }
    },
    getById: async (_, { series, whatShow }, { dataSources }) => {
      try {
        return await dataSources.movieAPI.getNowPlayingMovies(
            series,
            whatShow
        );
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
        return [];
      }
    },
    getSearchResult: async (_, { series, searchQuery }, { dataSources }) => {
      try {
        if (searchQuery) {
          const data = await dataSources.movieAPI.getSearchResult(
            series,
            searchQuery
          );
          return data.results;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
        return [];
      }
    },
  },
};

