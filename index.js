const autoCompleteConfig={
    renderOption(movie){       //how to show individual item
        const imgSrc=movie.Poster==='N/A'? "" : movie.Poster;  //spme movies in api dont have poster instead having N/A
      return `
      <img src="${imgSrc}"/>
       ${movie.Title} (${movie.Year})
      `
       },
       inputValue(movie){      //autofill input of chosen item
           return movie.Title 
       },
      async fetchData(searchTerm){
        const response = await axios.get('http://www.omdbapi.com/',{
            params:{
                apikey:'63f2b49e',
               s:searchTerm
            }
        });
    if(response.data.Error){
        return [];
    }
    
       return response.data.Search;
    }
}
createAutoComplete({
    ...autoCompleteConfig,  //get all data from autocompleteconfig
    root:document.querySelector('#left-autocomplete'),   //where to render autocomplete to
    onOptionSelect(movie){     //when click to item in dropdown
        document.querySelector('.tutorial').classList.add('is-hidden')  
        onMovieSelect(movie,document.querySelector('#left-summary'),'left')
       },
});
createAutoComplete({
    ...autoCompleteConfig, 
    root:document.querySelector('#right-autocomplete'),   //where to render autocomplete to
    onOptionSelect(movie){     //when click to item in dropdown
        document.querySelector('.tutorial').classList.add('is-hidden')  
        onMovieSelect(movie,document.querySelector('#right-summary'),'right')

       },
});

let leftMovie;  // to give differenet colour to superior
let rightMovie;
const onMovieSelect=async (movie,summaryElement,side)=>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params:{
            apikey:'63f2b49e',
           i:movie.imdbID   //additional data of movie
        } 
    });
summaryElement.innerHTML=movieTemplate(response.data)    
if(side=='left'){
    leftMovie=response.data;
}else{
    rightMovie=response.data;
}
if(leftMovie && rightMovie){
    runComaprison();
}
};
const runComaprison=()=>{
    console.log('time');
}


const movieTemplate=(movieDetail)=>{
    return `
    <article class='media'>
       <figure class='media-left'>
       <p class='image'>
       <img src="${movieDetail.Poster}"/>
       </p>
       </figure>
       <div class='media-content'>
       <div class='content'>
       <h1>${movieDetail.Title}</h1>
       <h4>${movieDetail.Genre}</h4>
       <p>${movieDetail.Plot}</p>
       </div>
       </div>
       </article>
       <article class='notification is-primary'>
       <p class='title'>${movieDetail.Awards}</p>
       <p class='subtitle'>Awards</p> 
       </article>
       <article class='notification is-primary'>
       <p class='title'>${movieDetail.BoxOffice}</p>
       <p class='subtitle'>Box Office</p> 
       </article>
       <article class='notification is-primary'>
       <p class='title'>${movieDetail.Metascore}</p>
       <p class='subtitle'>Metascore</p> 
       </article>
       <article class='notification is-primary'>
       <p class='title'>${movieDetail.imdbRating}</p>
       <p class='subtitle'>IMDB  Rating</p> 
       </article>
       <article class='notification is-primary'>
       <p class='title'>${movieDetail.imdbVotes}</p>
       <p class='subtitle'>IMDB Votes</p> 
       </article>
    `;
}