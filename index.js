// https://www.omdbapi.com/?i=tt3896198&apikey=e56ee402&s=fast


const movieListEl = document.querySelector(".movie__list")


async function onSearchChange(event) {
    const Search = event.target.value.trim()

    if (!Search) {
    movieListEl.innerHTML = ""
    return
}

    const moviesURL = `https://www.omdbapi.com/?i=tt3896198&apikey=e56ee402&s=${Search}`
    const movies = await fetch(moviesURL)
    const moviesData = await movies.json()

    if (!moviesData.Search) {
    movieListEl.innerHTML = "<p>No movies found</p>"
    return
}

  movieListEl.innerHTML = moviesData.Search.map((Search) => movieHtml(Search)).join("")






}


function showMovieDetails(Title) {
    localStorage.setItem("Title", Title)
}

function movieHtml(Search) {
return `
        <div class="movie">
        <img class="movie__poster" src="${Search.Poster}">
          <h3 class="movie__title">${Search.Title}</h3>
          <p class="movie__year">${Search.Year}</p>
      </div>`
}

