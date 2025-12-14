// https://www.omdbapi.com/?i=tt3896198&apikey=e56ee402&s=fast

const movies = "https://www.omdbapi.com/?i=tt3896198&apikey=e56ee402&s=fast"

async function main() {
    const response = await fetch(movies)
    const data = await response.json()
    console.log(data)
}

main()