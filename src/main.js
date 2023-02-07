const API_KEY = '4fb89b77a58cc78532d66cb766ccdab3';

//consumir API usando axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: { //usamos params para enviar query parameters 
      'api_key': API_KEY,
    },
});

// Funcion para reutilizar codigo del foreach de cada pelicula y crear dinamicamente el container de las peliculas
function createMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

//Funcion para reutulizar codigo de crear categorias
function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// Funcion para traerme las peliculas en trendding de la API (aparecen en el slide del home)
async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day'); //endpoint de la API
    const movies = data.results; //guardamos el array de peliculas en movies
    console.log(data);

    createMovies(movies, trendingMoviesPreviewList);
}

// funcion para traer categoria de peliculas
async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4fb89b77a58cc78532d66cb766ccdab3');
    const data = await res.json();
    console.log(res);
    console.log(data);

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList)  ;
}

//funcion para filtrar y traerme las peliculas de una categoria
async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

//funcion para buscar peliculas
async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', { //endpoint de busqueda
    params: {
      query,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

//funcion para trer las peliculas en tendencia (aparece al clickear ver mas en el home)
async function getTrendingMovies() {
  const { data } = await api('trending/movie/day'); //endpoint de la API
  const movies = data.results; //guardamos el array de peliculas en movies
  console.log(data);

  createMovies(movies, genericSection); //usamos el mismo generic section pero ahora con la lista de tendencias
}