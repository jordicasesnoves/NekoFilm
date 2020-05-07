import { gql } from "apollo-boost";

export const movieQuery = gql`
  query Movie($id: Int!) {
    movie(id: $id) {
      title
      id
      poster_path
      backdrop_path
      release_date
      overview
      runtime
      vote_average
      production_countries {
        iso_3166_1
        name
      }
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
        crew {
          name
          job
        }
      }
      videos {
        results {
          type
          site
          key
        }
      }
    }
  }
`;
