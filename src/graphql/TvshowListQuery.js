import { gql } from "apollo-boost";

export const tvshowListQuery = gql`
  query Shows($name: String!) {
    shows(name: $name) {
      results {
        id
        name
        poster_path
        first_air_date
      }
    }
  }
`;
