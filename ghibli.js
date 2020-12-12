/* Studio Ghibli API Project
  Steve Emerson
  Started 12/5/20
*/

 // Gonna need some global vaiables dangit.
let movies;  // holds data from film fetch
let people;  // holds data from people fetch
let species;  // holds data from species fetch
let locations;  // holds data from locations fetch

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
getGhibliData();

// Get the data
function getGhibliData(){

  // Fetch film data and send to row builder
  fetch(baseURL + "/films")
  .then(results => {
    return results.json();
  })
  .then(data => {
    movies = data;
    buildPage(movies)
  })
  .catch(err => console.log(err));

  // Fetch the people data and store
  fetch(baseURL + "/people")
  .then(results => {
    return results.json();
  })
  .then(data => {
    people = data;
    
  })
  .catch(err => console.log(err));

  // Fetch the species data and store
  fetch(baseURL + "/species")
  .then(results => {
    return results.json();
  })
  .then(data => {
    species = data;
    
  })
  .catch(err => console.log(err));

  // Fetch the locations data and store
  fetch(baseURL + "/locations")
  .then(results => {
    return results.json();
  })
  .then(data => {
    locations = data;
    
  })
  .catch(err => console.log(err));

}

// Build the page using the data
function buildPage(data){

  for(let i = 0; i < data.length; i++){
    mainContainer.appendChild(makeRow(data[i], moviePics[i], i));
  }

}

//Builds the individual movie data row. Returns the row.
function makeRow(movieData, imageSrc, num){

  // console.log(movieData);
  const imageColWidth = 2;
  const detailsColWidth = 3;
  const summaryColWidth = 7;
  const imagePath = './assets/images/' + imageSrc;

  // The row
  let movie = document.createElement('div');
  movie.setAttribute('class', 'row movie');

  movie.setAttribute('id', movieData.id);

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

  // image column
  let movieImage = document.createElement('img');
  movieImage.setAttribute('class', 'movie-image');
  movieImage.setAttribute('src', imagePath);
  imageCol.appendChild(movieImage);

  // bio column
  let bioDiv = document.createElement('div');
  bioDiv.setAttribute('class', 'bio');
  detailsCol.appendChild(bioDiv);

  let titlePar = document.createElement('p');
  titlePar.setAttribute('class', 'bio-par');
  titlePar.textContent = `Title: ${movieData.title}`;
  bioDiv.appendChild(titlePar);

  let directorPar = document.createElement('p');
  directorPar.setAttribute('class', 'bio-par');
  directorPar.textContent = `Director: ${movieData.director}`;
  bioDiv.appendChild(directorPar);

  let producerPar = document.createElement('p');
  producerPar.setAttribute('class', 'bio-par');
  producerPar.textContent = `Producer: ${movieData.producer}`;
  bioDiv.appendChild(producerPar);

  let releasePar = document.createElement('p');
  releasePar.setAttribute('class', 'bio-par');
  releasePar.textContent = `Release: ${movieData.release_date}`;
  bioDiv.appendChild(releasePar);

  // summary column
  let summaryDiv = document.createElement('div');
  summaryDiv.setAttribute('class', 'row summary-div');
  summaryCol.appendChild(summaryDiv);
  let summaryPar = document.createElement('p');
  summaryPar.setAttribute('class', 'summary-par');
  description = movieData.description;
  summaryPar.textContent = description;
  summaryDiv.appendChild(summaryPar);

  let dataLink = document.createElement("div");
  dataLink.className = 'data-links';
  summaryCol.append(dataLink);

  let summaryLink = document.createElement("span");
  summaryLink.className = 'data-link';
  summaryLink.id = 'summary';
  summaryLink.textContent = 'Summary'
  summaryLink.addEventListener('click', addSummary);
  dataLink.append(summaryLink);

  let peopleLink = document.createElement("span");
  peopleLink.className = 'data-link';
  peopleLink.id = 'people';
  peopleLink.textContent = 'People'
  peopleLink.addEventListener('click', addPeople);
  dataLink.append(peopleLink);

  let speciesLink = document.createElement("span");
  speciesLink.className = 'data-link';
  speciesLink.id = 'species';
  speciesLink.textContent = 'Species'
  speciesLink.addEventListener('click', addSpecies);
  dataLink.append(speciesLink);

  let locationsLink = document.createElement("span");
  locationsLink.className = "data-link";
  locationsLink.id = "locations";
  locationsLink.textContent = 'Locations'
  locationsLink.addEventListener('click', addLocations);
  dataLink.append(locationsLink);

  return movie;
  
}

// Functions to build summary inormation based on link clicks
function addSummary(e){
  let movieId =  e.target.parentNode.parentNode.parentNode.id;

  let movie = movies.find(element => element.id == movieId);

  let summaryPanel = e.target.parentNode.parentNode;
  let summaryDiv = summaryPanel.childNodes[0];
  summaryDiv.innerHTML = "";

  let summaryPar = document.createElement("p");
  summaryPar.className = 'summary-par'
  summaryPar.textContent = movie.description;
  summaryDiv.appendChild(summaryPar);
}

function addPeople(e){
  let movieId =  e.target.parentNode.parentNode.parentNode.id;

  let movie = movies.find(element => element.id == movieId);

  let summaryPanel = e.target.parentNode.parentNode;
  let summaryDiv = summaryPanel.childNodes[0];
  summaryDiv.innerHTML = "";
  
  let peopleArray = getMoviePeople(movie.id);

  if(peopleArray.length === 0){
    let none = document.createElement("p")
    none.textContent = "None Returned";
    summaryDiv.appendChild(none);
  }else{

    let personNameDiv = document.createElement("div");
    personNameDiv.className = "col-md-3";
    summaryDiv.appendChild(personNameDiv);
    let personBioDiv = document.createElement("div");
    personBioDiv.className = "col-md-9 person-bio-div";
    summaryDiv.appendChild(personBioDiv);

    for(person of peopleArray){
      let personPar = document.createElement("p");
      personPar.className = 'person-par'
      personPar.id = person.id;
      personPar.textContent = person.name;
      personPar.addEventListener('click', addPersonBio);
      personNameDiv.appendChild(personPar);
    }
  }
}

function addPersonBio(e) {
  let personId = e.target.id;
  console.log(personId);
  let bioDiv = e.target.parentNode.parentNode.childNodes[1];
  bioDiv.innerHTML = "";

  let person = people.find(element => element.id == personId);

  let namePar = document.createElement('p');
  namePar.className = 'bio-name-par';
  namePar.textContent = person.name;
  bioDiv.appendChild(namePar);

  let genderPar = document.createElement('p');
  genderPar.className = 'bio-data-par';
  genderPar.textContent = `Gender: ${person.gender}`;
  bioDiv.appendChild(genderPar);

  let agePar = document.createElement('p');
  agePar.className = 'bio-data-par';
  agePar.textContent = `Age: ${person.age}`;
  bioDiv.appendChild(agePar);

  let eyePar = document.createElement('p');
  eyePar.className = 'bio-data-par';
  eyePar.textContent = `Eye color: ${person.eye_color}`;
  bioDiv.appendChild(eyePar);

  let hairPar = document.createElement('p');
  hairPar.className = 'bio-data-par';
  hairPar.textContent = `Hair color: ${person.hair_color}`;
  bioDiv.appendChild(hairPar);

  let speciesPar = document.createElement('p');
  speciesPar.className = 'bio-data-par';
  let specieId = person.species.split("/").pop();
  
  let speciesData = species.find(element => element.id == specieId);
  speciesPar.textContent = `Species: ${speciesData.name}`;
  bioDiv.appendChild(speciesPar);

}

function addSpecies(e){

  let movieId =  e.target.parentNode.parentNode.parentNode.id;
  console.log(movieId);

  let movie = movies.find(element => element.id == movieId);

  let summaryPanel = e.target.parentNode.parentNode;
  let summaryDiv = summaryPanel.childNodes[0];
  summaryDiv.innerHTML = "";

  let speciesArray = getMovieSpecies(movie.id);

  if(speciesArray.length === 0){
    let none = document.createElement("p");
    none.textContent = "None Returned";
    summaryDiv.appendChild(none);
  }else{
    let speciesNameDiv = document.createElement("div");
    speciesNameDiv.className = "col-md-2";
    summaryDiv.appendChild(speciesNameDiv);
    let speciesInfoDiv = document.createElement("div");
    speciesInfoDiv.className = "col-md-10 person-bio-div";
    summaryDiv.appendChild(speciesInfoDiv);

    for(const s of speciesArray){
      let speciesPar = document.createElement("p");
      speciesPar.className = 'person-par'
      speciesPar.id = s.id;
      speciesPar.textContent = s.name;
      speciesPar.addEventListener('click', addSpeciesData);
      speciesNameDiv.appendChild(speciesPar);
    }
  }
}

function addSpeciesData(e) {
  let speciesId = e.target.id;
  console.log(speciesId);
  let speciesInfoDiv = e.target.parentNode.parentNode.childNodes[1];
  speciesInfoDiv.innerHTML = "";

  let currSpecies = species.find(element => element.id == speciesId);
  // console.log(currSpecies);

  let speciesNamePar = document.createElement('p');
  speciesNamePar.className = 'bio-name-par';
  speciesNamePar.textContent = currSpecies.name;
  speciesInfoDiv.appendChild(speciesNamePar);

  let classificationPar = document.createElement('p');
  classificationPar.className = 'bio-data-par';
  classificationPar.textContent = `Classification: ${currSpecies.classification}`;
  speciesInfoDiv.appendChild(classificationPar);

  let charactersPar = document.createElement('p');
  charactersPar.className = 'bio-data-par';

  let movieId =  e.target.parentNode.parentNode.parentNode.parentNode.id;
  let charactersArray = getMoviePeople(movieId);

  let speciesCharacters = charactersArray.filter(value => 
    value.species.split("/").pop() === speciesId
  );

  let characterNames= [];

  for (const character of speciesCharacters){
    characterNames.push(character.name);
  }

  charactersPar.textContent = (characterNames.length === 0)
  ? "Characters: None Returned"
  : `Characters: ${characterNames.join(", ")}`;

  speciesInfoDiv.appendChild(charactersPar);

}

function addLocations(e){
  let movieId =  e.target.parentNode.parentNode.parentNode.id;
  console.log(movieId);

  let movie = movies.find(element => element.id == movieId);

  let summaryPanel = e.target.parentNode.parentNode;
  let summaryDiv = summaryPanel.childNodes[0];
  summaryDiv.innerHTML = "";

  let locationsArray = getMovieLocations(movieId);
  console.log(locationsArray); 

  if(locationsArray.length === 0){
    let none = document.createElement("p");
    none.textContent = "None Returned";
    summaryDiv.appendChild(none);
  }else{
    let locationsNameDiv = document.createElement("div");
    locationsNameDiv.className = "col-md-2";
    summaryDiv.appendChild(locationsNameDiv);
    let locationsInfoDiv = document.createElement("div");
    locationsInfoDiv.className = "col-md-10 person-bio-div";
    summaryDiv.appendChild(locationsInfoDiv);

    for(const loc of locationsArray){
      let locationPar = document.createElement("p");
      locationPar.className = 'person-par'
      locationPar.id = loc.id;
      locationPar.textContent = loc.name;
      locationPar.addEventListener('click', addLocationData);
      locationsNameDiv.appendChild(locationPar);
    }

  }

}

function addLocationData(e){
  let locationId = e.target.id;
  console.log(locationId);
  let locationInfoDiv = e.target.parentNode.parentNode.childNodes[1];
  locationInfoDiv.innerHTML = "";

  let location = locations.find(element => element.id == locationId);
  console.log(location);

  let locationNamePar = document.createElement('p');
  locationNamePar.className = 'bio-name-par';
  locationNamePar.textContent = location.name;
  locationInfoDiv.appendChild(locationNamePar);

  let climatePar = document.createElement('p');
  climatePar.className = 'bio-data-par';
  climatePar.textContent = `Climate: ${location.climate}`;
  locationInfoDiv.appendChild(climatePar);

  let terrainPar = document.createElement('p');
  terrainPar.className = 'bio-data-par';
  terrainPar.textContent = `Terrain: ${location.terrain}`;
  locationInfoDiv.appendChild(terrainPar);

  let residentsPar = document.createElement('p');
  residentsPar.className = 'bio-data-par';

  let locationResidents = location.residents;
  if (locationResidents.length === 0 || locationResidents[0] === "TODO"){
    residentsPar.textContent = "Residents: None Returned";
  }else{
    let residentNames = [];
    locationResidents.forEach((resident) => {
      let residentId = resident.split("/").pop();
      let residentName = people.find(element => element.id === residentId).name;
      //console.log(residentName);
      residentNames.push(residentName);
    });
    console.log(residentNames);
    residentsPar.textContent = `Residents: ${residentNames.join(", ")}`;
  }
  
  
  locationInfoDiv.appendChild(residentsPar);
}

// Takes a movie id and returns an array of objects containing people data for that film'
function getMoviePeople(movieId){
  let peopleArray = [];
  for (const person of people) {
    for (const film of person.films){
      let filmURLSplit = film.split("/");
      let personMovieId = filmURLSplit.pop();
      if (personMovieId === movieId){
        peopleArray.push(person);
      }
    }
  }

  return peopleArray;

}

function getMovieSpecies(movieId){
  let speciesArray = [];
  for (const s of species) {
    for (const film of s.films){
      let filmURLSplit = film.split("/");
      let sMovieId = filmURLSplit.pop();
      if (sMovieId === movieId){
        speciesArray.push(s);
      }
    }
  }

  return speciesArray;

}

function getMovieLocations(movieId){
  let locationsArray = [];
  for (const location of locations) {
    for (const film of location.films){
      let filmURLSplit = film.split("/");
      let locationMovieId = filmURLSplit.pop();
      if (locationMovieId === movieId){
        locationsArray.push(location);
      }
    }
  }

  return locationsArray;

}



