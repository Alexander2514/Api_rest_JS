const api= axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers :{
        'Content-Type' : 'application/json;charset=utf-8'
    } ,
    params: {
        'api_key': API_KEY,

    }
})


function activateGenericList() {
    // Agregar el estilo dinámicamente
    let style = document.createElement("style");
    style.innerHTML = `
        #genericList {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
    `;
    document.head.appendChild(style);

    // Mostrar el #genericList
    document.getElementById("genericList").style.display = "grid";
}

//utils s
function createMovies(movies,container){
    container.innerHTML = '' // limpiamos estos datos para evitar la carga duplicada.
    movies.forEach(movie => {

        

        const movieContainer= document.createElement('div')
        movieContainer.classList.add('movie_container')
        movieContainer.addEventListener('click', () => {
            location.hash= '#movie=' + movie.id 
        })


        const img= document.createElement('img')
        img.classList.add('movie-img')
        img.setAttribute('alt',movie.title)
        img.setAttribute('src','https://image.tmdb.org/t/p/w300/' + movie.poster_path)
        
        movieContainer.appendChild(img)
        container.appendChild(movieContainer)

    });
}

function createCategories(category,container){
    container.innerHTML= ''
     
    category.forEach(category => {

        const CategoryContainer= document.createElement('div')
        CategoryContainer.classList.add('category-container')

        const CategoryTitle = document.createElement('h3')
        CategoryTitle.classList.add('category-title')
        CategoryTitle.setAttribute('id', 'id' + category.id)
        CategoryTitle.addEventListener('click', () => {
            location.hash='category=' + category.id + '-' + category.name
        })

        const CategoryTitleText= document.createTextNode(category.name)
        CategoryTitle.appendChild(CategoryTitleText)
        CategoryContainer.appendChild(CategoryTitle)
        container.appendChild(CategoryContainer)

    });
}

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day')
    

    const movies = data.results
    

    createMovies(movies,trendingMoviesPreviewList)
}


// colocar colores por cada categoria
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list')
    

    const categories = data.genres

   createCategories(categories,categoriesPreviewList)
}



async function getMovieByCategory(id){
    const { data } = await api('discover/movie',{
        params:{
            with_genres: id,
        }
    })
    

    const movies = data.results
    

    createMovies(movies,genericSection)
}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie',{
        params:{
            query // como el parametro de la api y el de la funcionen coincide solo se deja el nombre.
        }
    })
    

    const movies = data.results
    

    createMovies(movies,genericSection)
}

async function getTrendingMovies(){
    const { data } = await api('trending/movie/day')
    

    const movies = data.results
    

    createMovies(movies,genericSection)
}

async function getMovieById(id){
    const { data: movie } = await api('movie/' + id)

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/'  + movie.poster_path
    movieImg.setAttribute('src',movieImgUrl)
    movieDetailTitle.textContent= movie.title
    movieDetailDescription.textContent= movie.overview
    movieDetailScore.textContent= '⭐'+movie.vote_average

    createCategories(movie.genres,movieDetailCategoriesList)
    getRelatedMvId(id)

    
}

async function getRelatedMvId(id){
    const { data } = await api(`movie/${id}/recommendations`)
    const relatedMovies=data.results
    createMovies(relatedMovies,relatedMoviesContainer)
}
