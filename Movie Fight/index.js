// key: 6db3c70a
const autoCompleteConfig = {
  // processing data from api
  renderOption(movie){
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}"/>
      ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(movie){
    return movie.Title;
  },
  async fetchData(searchTerm){
    // passing second argument to Axios will let Axios attached the second arguments to the api request
    const response = await axios.get('http://www.omdbapi.com/', {
      params:{
        apikey: '6db3c70a',
        s: searchTerm
      }
    });
  
    if (response.data.Error){
      return [];
    }
  
    return response.data.Search;
  }
};

// left side search
createAutoComplete({
  ...autoCompleteConfig, // ... mean takes everything inside the object and copy them here.
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  }
});

// right side search
createAutoComplete({
  ...autoCompleteConfig, // ... mean takes everything inside the object and copy them here.
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  }
});

let leftMovie;
let rightMovie;

// making request to get detail of the particular movie when selected from dropdown menu
const onMovieSelect = async (movie, summaryElement, side) =>{
  const response = await axios.get('http://www.omdbapi.com/', {
    params:{
      apikey: '6db3c70a',
      i: movie.imdbID
    }
  });
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left'){
    leftMovie = response.data;
  }else{
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie){
    runComparision();
  }
};

const runComparision = () =>{
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');

  // go each stat from both side
  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);

    // lose side will have yellow color for the stat, 
    // win side will have green color for the stat
    if (rightSideValue > leftSideValue){
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    }else{
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }

  })
};


// construct HTML template for the selected movie to display on the screen
const movieTemplate = movieDetail => {
  // remove $ and , (comma) from the money value. Ex: $6,200,300 -> 6200300
  const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
  
  // Foreach to get value of the awards
  // let count = 0;
  // const awards = movieDetail.Awards.split(' ').forEach(word => {
  //   const value = parseInt(word);
  //   // isNaN(parameter) : check to see if the data is the number or not.
  //   if (isNaN(value)){
  //     return;
  //   } else{
  //     count += value;
  //   }
  // });

  // Reduce approach
  const awards = movieDetail.Awards.split(' ').reduce((pre, word) => {
    const value = parseInt(word);
    // isNaN(parameter) : check to see if the data is the number or not.
    if (isNaN(value)){
      return pre;
    } else{
      return pre + value;
    }
  }, 0);


  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1> ${movieDetail.Title} (${movieDetail.Year}) </h1>
          <h4> ${movieDetail.Genre} </h4>
          <p> ${movieDetail.Plot} </p>
        </div>
      </div>
    </article>

    <article data-value=${awards} class="notification is-primary">
      <p class="title"> ${movieDetail.Awards} </p>
      <p class="subtitle"> Awards </p>
    </article>

    <article data-value=${dollars} class="notification is-primary">
      <p class="title"> ${movieDetail.BoxOffice} </p>
      <p class="subtitle"> Box Office </p>
    </article>

    <article data-value=${metascore} class="notification is-primary">
      <p class="title"> ${movieDetail.Metascore} </p>
      <p class="subtitle"> Metascore </p>
    </article>

    <article  data-value=${imdbRating} class="notification is-primary">
      <p class="title"> ${movieDetail.imdbRating} </p>
      <p class="subtitle"> IMDB Rating </p>
    </article>

    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title"> ${movieDetail.imdbVotes} </p>
      <p class="subtitle"> IMDB Votes </p>
    </article>
  `;
};