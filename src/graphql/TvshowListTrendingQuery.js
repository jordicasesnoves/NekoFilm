import { gql } from "apollo-boost";

export const TvshowListTrendingQuery = gql`
  query TrendingShows {
    showsTrending {
      results {
        id
        name
        poster_path
        first_air_date
      }
    }
  }
`;
