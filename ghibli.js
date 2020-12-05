/* Studio Ghibli API Project
  Steve Emerson
  Started 12/5/20
*/

// Initial variables and queries
let baseURL = 'https://ghibliapi.herokuapp.com';
let resultsPar = document.querySelector('.ghibli-data');
let getGhibli = document.querySelector('.ghibli-button');
let mainContainer = document.querySelector('.container');

let moviePics = ['Castle_in_the_Sky.webp', 'Grave_of_the_Fireflies_Japanese_poster.webp', 'My_Neighbor_Totoro.webp', 'kikis-delivery-service-md-web.jpg', 'only-yesterdy.jpg', 'porco-rosso.jpg','pom-poko.jpg', 'StudioGhibli_WhisperLarge1_master.jpg', 'mononoke.jpg', 'My_Neighbors_the_Yamadas.webp','spirited-away.jpg', 'thecatreturns--hayao-miyazaki-cartoons.jpg','howls-moving-castle.jpg', 'tales-from-earthsea.jpg', 'ponyo.jpg', 'arriety.jpg','from-up-on-poppy-hill.jpg','wind-rises.jpg','kaguya.jpg','marnie.jpg' ]

//Add event listener to button
getGhibli.addEventListener("click", getGhibliFilms);

//get the data
function getGhibliFilms(){
  let url = baseURL + "/films"
  fetch(url)
  .then(results => {
    return results.json();
  })
  .then(data => {
    console.log(data);
    buildPage(data)
  })
  .catch(err => console.log(err));
}

//build the page using the data
function buildPage(data){

  for(let i = 0; i < data.length; i++){
    mainContainer.appendChild(makeRow(data[i], moviePics[i]));
  }

}

//Builds the individual movie data row. Returns the row.
function makeRow(rowData, imageSrc){
  const imageColWidth = 4;
  const detailsColWidth = 12 - imageColWidth;
  const imagePath = './assets/images/' + imageSrc;

  // The row
  let movie = document.createElement('div');
  movie.setAttribute('class', 'row movie');

  // Column elements
  let imageCol = document.createElement('div', 'col-med-'+imageColWidth);
  movie.appendChild(imageCol);
  let detailsCol = document.createElement('div', 'col-med-'+detailsColWidth);
  detailsCol.setAttribute('class', 'details');
  movie.appendChild(detailsCol);

  // Stuff in the rows
  let movieImage = document.createElement('img');
  movieImage.setAttribute('class', 'movie-image');
  movieImage.setAttribute('src', imagePath);
  imageCol.appendChild(movieImage);

  let bioDiv = document.createElement('div');
  bioDiv.setAttribute('class', 'bio');
  detailsCol.appendChild(bioDiv);

  let titlePar = document.createElement('p');
  titlePar.setAttribute('class', 'bio-par');
  titlePar.textContent = `Title: ${rowData.title}`;
  bioDiv.appendChild(titlePar);

  let directorPar = document.createElement('p');
  directorPar.setAttribute('class', 'bio-par');
  directorPar.textContent = `Director: ${rowData.director}`;
  bioDiv.appendChild(directorPar);

  let producerPar = document.createElement('p');
  producerPar.setAttribute('class', 'bio-par');
  producerPar.textContent = `Producer: ${rowData.producer}`;
  bioDiv.appendChild(producerPar);

  let releasePar = document.createElement('p');
  releasePar.setAttribute('class', 'bio-par');
  releasePar.textContent = `Release: ${rowData.release_date}`;
  bioDiv.appendChild(releasePar);

  return movie;
  
}