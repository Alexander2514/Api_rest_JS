
searchFormBtn.addEventListener('click', ()=> {
    
    location.hash='#search=' + searchFormInput.value
    
})

trendingBtn.addEventListener('click',() => 
location.hash= '#trends'
)

arrowBtn.addEventListener('click',() => 

history.back()//metodo que te devuelve a la vista anterior..
// location.hash= '#home'
)


window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('hashchange',navigator,false)


function navigator(){
    console.log(location)
    if(location.hash.startsWith('#trends')){
        activateGenericList()
        TrendsPage()
        
    } else if (location.hash.startsWith('#search=')){
        searchPage()
        activateGenericList()
    }
    else if (location.hash.startsWith('#movie=')){
        movieDetailsPage()
        genericSection.style.display='none'
    } else if (location.hash.startsWith('#category=')){
        CategoriesPage()
        activateGenericList()
    } else {
        
        homePage()
        genericSection.style.display='none'
    }
    document.body.scrollTop= 0
    document.documentElement.scrollTop=0  //safari
    // siempre eliminar el scroll, en todos los navegadores
}


function homePage(){
    console.log('Home!!');

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

function searchPage(){
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
  
    ['#search', 'platzi']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}
function movieDetailsPage(){
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

  // ['#movie', '234567']
  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
}
function CategoriesPage(){
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



    const [_,categoryData] =location.hash.split('=') 
    const [categoryId,categoryName] =categoryData.split('-')
    headerCategoryTitle.innerHTML= categoryName

    getMovieByCategory(categoryId)
}
function TrendsPage(){
    console.log('TRENDS!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML= 'tendencias'

    getTrendingMovies()

}



