import { gql } from "apollo-boost";

export const tvshowQuery = gql`
  query Show($id: Int!) {
    show(id: $id) {
      id
      name
      created_by {
        id
        name
      }
      poster_path
      backdrop_path
      first_air_date
      last_air_date
      number_of_seasons
      overview
      vote_average
      genres {
        id
        name
      }
      credits {
        cast {
          id
          name
          character
          profile_path
        }
      }
    }
  }
`;
