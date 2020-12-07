/* Studio Ghibli API Project
  Steve Emerson
  Started 12/5/20
*/

// Initial variables and queries
let baseURL = 'https://ghibliapi.herokuapp.com';
let backGroundDiv = document.querySelector('.background-image');
let mainContainer = document.querySelector('.container');

let backImages = ['chihiro016.jpg', 'chihiro025.jpg', 'chihiro037.jpg', 'ged014.jpg', 'ged020.jpg', 'kaguyahime007.jpg', 'kaguyahime010.jpg', 'kaguyahime021.jpg', 'karigurashi003.jpg', 'karigurashi021.jpg', 'karigurashi027.jpg', 'kazetachinu001.jpg', 'kazetachinu024.jpg', 'kazetachinu043.jpg', 'kokurikozaka003.jpg', 'kokurikozaka009.jpg', 'kokurikozaka010.jpg', 'marnie001.jpg', 'marnie013.jpg', 'marnie037.jpg', 'ponyo016.jpg', 'ponyo041.jpg']

let moviePics = ['Castle_in_the_Sky.webp', 'Grave_of_the_Fireflies_Japanese_poster.webp', 'My_Neighbor_Totoro.webp', 'kikis-delivery-service-md-web.jpg', 'only-yesterdy.jpg', 'porco-rosso.jpg','pom-poko.jpg', 'StudioGhibli_WhisperLarge1_master.jpg', 'mononoke.jpg', 'My_Neighbors_the_Yamadas.webp','spirited-away.jpg', 'thecatreturns--hayao-miyazaki-cartoons.jpg','howls-moving-castle.jpg', 'tales-from-earthsea.jpg', 'ponyo.jpg', 'arriety.jpg','from-up-on-poppy-hill.jpg','wind-rises.jpg','kaguya.jpg','marnie.jpg' ]

// Get random background image
let imgIndex = Math.floor(Math.random()*backImages.length);
let backImagePath = './assets/images/ghibli-random/' + backImages[imgIndex];
backGroundDiv.style.backgroundImage = "url(" + backImagePath + ")";

// Driver
getGhibliFilms();

//Get the data
function getGhibliFilms(){
  let url = baseURL + "/films"
  fetch(url)
  .then(results => {
    return results.json();
  })
  .then(data => {
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

  console.log(rowData);
  const imageColWidth = 3;
  const detailsColWidth = (12 - imageColWidth) / 2;
  const summaryColWidth = (12 - imageColWidth) / 2;
  const imagePath = './assets/images/' + imageSrc;

  // The row
  let movie = document.createElement('div');
  movie.setAttribute('class', 'row movie');

  // Column elements
  let imageCol = document.createElement('div');
  imageCol.setAttribute('class', 'col-med-'+ imageColWidth + ' image');
  movie.appendChild(imageCol);
  let detailsCol = document.createElement('div');
  detailsCol.setAttribute('class', 'col-med-'+ detailsColWidth + ' details');
  movie.appendChild(detailsCol);
  let summaryCol = document.createElement('div');
  summaryCol.setAttribute('class', 'col-med-'+ summaryColWidth + ' summary');
  movie.appendChild(summaryCol);

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

  let summaryPar = document.createElement('p');
  summaryPar.setAttribute('class', 'summary-par');
  summaryPar.textContent = rowData.description;
  summaryCol.appendChild(summaryPar);

  return movie;
  
}