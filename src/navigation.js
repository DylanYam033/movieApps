// Usamos navigation para evitar poner anclas en algunas etiquetas, ya que al poner un  href en el ancla tendriamos
// que cargar de nuevo todo lo que estemos usando, por el contrario si usamos Location y hash navigation, evitamos
// esto, por lo que estas dos funciones nos permiten ejecutar ciertas funciones, dependiendo de la localizacion 
// de la url en la que nos encontremos, esto usando id por cada seccion en la que nos encontremos en ese momento.

searchFormBtn.addEventListener('click', () => {
    value = searchFormInput.value;
    location.hash = '#search=' + value; //capturamos el valor ingresado para mostrarlo en la url
});
  
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
  
arrowBtn.addEventListener('click', () => {
  location.hash = window.history.back(); //volver a la url anterior
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });

  //preguntamos si la locacion actual empiza por #trends (tambien le podemos cambiar el valor con location.hash = "")
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
    smoothscroll();
  } else { //si la url no tiene un #, estamos en home y ejecutamos las funciones del home
    homePage();
  }
}

function smoothscroll(){
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
       window.requestAnimationFrame(smoothscroll);
       window.scrollTo (0,currentScroll - (currentScroll/5));
  }
};

// En estas funciones mostramos u ocultamos elementos dependiendo de la url donde estemos
function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // Tomamos la url de #category= que es la en que estamos y manipulamos con metodo split para obtener el id 
    // de la categoria que hayamos clickeado para luego mandar ese id a la funcion del endpoint de filtrar categorias

    // '#category=12-Adventure' url actual 
    const [_, categoryData] = location.hash.split('='); //separamos donde encuentre un = 
    // categoryData = id-name
    // ['#category', 'id-name']
    const [categoryId, categoryName] = categoryData.split('-');
    // ['id', 'name']

    headerCategoryTitle.innerHTML = categoryName; //insertamos el name de la categoria
    decodeURIComponent(categoryName);
  
    getMoviesByCategory(categoryId); // le pasamos categoryId, que es en donde almacenamos el id de la url actual
}

function movieDetailsPage() {
    console.log('Movie!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}

function searchPage() {
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //tomamos la url actual y la manipulamos para sacar el valor ingresado en el buscador
    // ['#search', 'nombre pelicula'] '#search=nea'
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage() {
    console.log('TRENDS!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies()
}

