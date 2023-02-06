// Usamos navigation para evitar poner anclas en algunas etiquetas, ya que al poner un  href en el ancla tendriamos
// que cargar de nuevo todo lo que estemos usando, por el contrario si usamos Location y hash navigation, evitamos
// esto, por lo que estas dos funciones nos permiten ejecutar ciertas funciones, dependiendo de la localizacion 
// de la url en la que nos encontremos, esto usando id por cada seccion en la que nos encontremos en ese momento.

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
  } else { //si la url no tiene un #, estamos en home y ejecutamos las funciones del home
    homePage();
  }
}


function homePage() {
  console.log('Home!!');

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function categoriesPage() {
  console.log('categories!!');
}

function movieDetailsPage() {
  console.log('Movie!!');
}

function searchPage() {
  console.log('Search!!');
}

function trendsPage() {
  console.log('TRENDS!!');
}

