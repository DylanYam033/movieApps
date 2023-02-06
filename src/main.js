const API_KEY = '4fb89b77a58cc78532d66cb766ccdab3';

//consumir API usando axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
});

// Funcion para traerme las peliculas en trendding de la API
async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day'); //endpoint de la API
    const movies = data.results; //guardamos el array de peliculas en movies
    console.log(data);

    movies.forEach(movie => {

      // seleccionamos la etiqueta con id=trendingPreview y que tengan dentro otra etiqueta con la clase=trendingPreview-movieList
      const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
  
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300' + movie.poster_path,);
  
      movieContainer.appendChild(movieImg);
      trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}

// funcion para traer categoria de peliculas
async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4fb89b77a58cc78532d66cb766ccdab3');
    const data = await res.json();
    console.log(res);
    console.log(data);
   
    const categories = data.genres;
    categories.forEach(category => {
      const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
      
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3');

      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id); //traigo el id de cada categoria en el objeto category
      categoryTitle.innerText = category.name; //inserto en el h3 el nombre de la categoria

      categoryContainer.appendChild(categoryTitle);
      previewCategoriesContainer.appendChild(categoryContainer);
    });
}