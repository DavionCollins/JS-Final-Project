// https://www.omdbapi.com/?i=tt3896198&apikey=e56ee402&s=fast
function openMenu() {
document.body.classList.add('menu__open')
}

function closeMenu() {
document.body.classList.remove('menu__open')
}

const searchText = document.getElementById("searchText")

const movieListEl = document.querySelector(".movie__list")
const filterEl = document.getElementById("search__result")
let movies = []
filterEl.style.display = "none"

async function onSearchClick() {
    const Search = document.querySelector(".search__input").value.trim()
    
    searchText.textContent = Search === "" ? "" : `"${Search}"`

    if (!Search) {
    movieListEl.innerHTML = ""
    movies = []
    }   
    else if (filterEl) {
        filterEl.style.display = ""
    }



    const moviesURL = `https://www.omdbapi.com/?i=tt3896198&apikey=e56ee402&s=${Search}`
    const response = await fetch(moviesURL)
    const moviesData = await response.json()

    if (!moviesData.Search) {
    movieListEl.innerHTML = "<p>No movies found</p>"
    return
}

movies = moviesData.Search

  movieListEl.innerHTML = moviesData.Search.map((Search) => movieHtml(Search)).join("")




}

filterEl.addEventListener("change", (event) => {
    const value = event.target.value

    if (!value || movies.length === 0 ) return;

    if (value === "year__asc") {
        movies.sort((a,b) => a.Year - b.Year)
    }

    else if (value === "year__dsc") {
        movies.sort((a,b) => b.Year - a.Year)
    }

    else if (value === "name__asc") {
        movies.sort ((a,b) => a.Title.localeCompare(b.Title))
    }

    else if (value === "name__dsc") {
        movies.sort ((a,b) => b.Title.localeCompare(a.Title))
    }
        renderMovies(movies)
})

function renderMovies(movies) {
    movieListEl.innerHTML = movies.map(movies => movieHtml(movies)).join("")
}


function showMovieDetails(Title) {
    localStorage.setItem("Title", Title)
}

function movieHtml(Search) {

    const poster = Search.Poster && Search.Poster !== "N/A" && Search.Poster.trim() !== "" ? Search.Poster : "Assets/noPoster.png"
return `
        <div class="movie">
        <img class="movie__poster" src="${poster}">
          <h3 class="movie__title">${Search.Title}</h3>
          <p class="movie__year">${Search.Year}</p>
      </div>`
}



