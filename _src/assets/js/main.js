'use strict';

const url = 'http://api.tvmaze.com/search/shows?q=';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const results = document.querySelector('.results');
const mySeriesTitle = document.querySelector('.my__series-title');
const mySeries = document.querySelector('.my__series');
const btnDelete = document.querySelector('.btn__delete');

let arrFav = [];

// <------  Search series. Esta función pinta en la pantalla todos los resultados de las búsquedas
function search(){
  fetch(`${url}${input.value}`)
    .then(response => response.json())
    .then(data => {
      results.innerHTML='';
      for(let i = 0; i<data.length; i++){
        const item = document.createElement('li');
        item.classList.add('result__serie');

        const title = document.createElement('h2');
        title.classList.add('result__title');
        const img = document.createElement('img');
        img.classList.add('result__img');

        const serie = data[i].show;
        const contName = document.createTextNode(`${serie.name}`);

        if(serie.image === null){
          img.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
          item.appendChild(img);
          img.setAttribute('alt', `Portada de ${serie.name} no disponible`);
        } else {
          img.setAttribute('src', `${serie.image.medium}`);
          item.appendChild(img);
          img.setAttribute('alt', `Portada de ${serie.name}`);
        }

        item.addEventListener('click', fav);

        title.appendChild(contName);
        item.appendChild(title);

        item.appendChild(img);
        results.appendChild(item);
      }
    });
}

btn.addEventListener('click', search);


//<---- Favourite series. Añade a las seleccionadas una clase para que se pinten distinto

//También mete en el array los objetos seleccionados y los guarda en el localStorage
function fav(){

  const favSerie = event.currentTarget;
  favSerie.classList.add('fav__serie');

  //Añadir las clases fav__title / fav__img
  const favTitle = event.currentTarget.firstChild;
  favTitle.classList.add('fav__title');

  const favImg = event.currentTarget.lastChild;
  favImg.classList.add('fav__img');

  //Hacemos objeto
  const obj = {title: `${favTitle.innerHTML}`, photo: `${favImg.src}`};
  arrFav.push(obj);
  
  saveData();

  draw(arrFav);
}

// draw() pinta la lista de favoritos de la izquierda
function draw(arr){
  mySeriesTitle.classList.remove('hidden');
  btnDelete.classList.remove('hidden');
  mySeries.innerHTML='';

  for(let y = 0; y<arr.length; y++){
    const favResult = document.createElement('ul');
    favResult.classList.add('fav__serie');
    const favList = document.createElement('li');
    favList.classList.add('my__serie');
    const arrTitle = document.createElement('h4');
    arrTitle.classList.add('my__title');
    const arrImg = document.createElement('img');
    arrImg.classList.add('my__image');
    const iconX = document.createElement('span');
    iconX.classList.add('my__icon');
    const arrTitleCont = document.createTextNode(`${arr[y].title}`);

    iconX.innerHTML= '<i class="fas fa-times-circle"></i>';

    arrImg.setAttribute('src', `${arr[y].photo}`);
    arrImg.setAttribute('alt', `Portada de ${arr[y].title}`);
  
    arrTitle.appendChild(arrTitleCont);
    favList.appendChild(arrImg);
    favList.appendChild(arrTitle);
    favList.appendChild(iconX);

    favResult.appendChild(favList);

    mySeries.appendChild(favResult);
  }
}


// <----- Save Data (LocalStorage)

function saveData(){
  localStorage.setItem('favSeries', JSON.stringify(arrFav));
}


function deleteLocalStorage(){
  localStorage.removeItem('favSeries');
  mySeries.innerHTML='';
  mySeriesTitle.classList.add('hidden');
  btnDelete.classList.add('hidden');
  arrFav = [];
}

btnDelete.addEventListener('click', deleteLocalStorage);

// <---- Print localStorage
function printFav(){
  const nuevo = JSON.parse(localStorage.getItem('favSeries'));
  if(nuevo !== null) {
    arrFav=nuevo;
    draw(arrFav);
    console.log(arrFav);
    console.log('Hay series favoritas guardadas');
  }else{
    //draw(nuevo);
    mySeriesTitle.classList.add('hidden');
    btnDelete.classList.add('hidden');
    console.log('Aún no hay series favoritas guardadas');
  }
}

window.addEventListener('load', printFav);

// // <----- Delete fav
// //Al clicar la X borrar de la lista de favoritos///Revisar esto porque no se cómo borrar solo un elemento del localStorage
// function deletefav(event){
//   const clicked = event.currentTarget;
//   const clickedLi = clicked.parentElement;
//   clickedLi.classList.add('hidden');
//   localStorage.removeItem('event');
// }

//iconX.addEventListener('click', deletefav); //Esto iba antes pero no va nada, así que pongo donde quieras
