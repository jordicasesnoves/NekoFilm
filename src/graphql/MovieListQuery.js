import { gql } from "apollo-boost";

export const movieListQuery = gql`
  query Movies($title: String!) {
    movies(title: $title) {
      results {
        id
        title
        poster_path
        release_date
      }
    }
  }
`;
