const apiKey = "11b344fd1cc0062152fd47cb83068730";

export default function getMovies({ keyword = "star wars" } = {}) {
  const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;
  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(apiURL, config)
    .then((res) => res.json())
    .then((response) => {
      const { results = [] } = response;
      if (response.total_results > 0) {
        const movies = results.map((movie) => {
          const { id, title, release_date } = movie;
          let { poster_path } = movie;

          if (poster_path != null) {
            poster_path = `https://image.tmdb.org/t/p/w300${poster_path}`;
          }

          return { id, title, release_date, poster_path };
        });
        return movies;
      } else {
        return `No results found for ${keyword}`;
      }
    });
}
