import { gql } from "apollo-boost";

export const movieListTrendingQuery = gql`
  query TrendingMovies {
    moviesTrending {
      results {
        id
        title
        poster_path
        release_date
      }
    }
  }
`;
