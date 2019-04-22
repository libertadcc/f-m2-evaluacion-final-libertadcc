'use strict';

const url = 'http://api.tvmaze.com/search/shows?q=';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const results = document.querySelector('.results');
let arrFav = []; //EN este array tenemos que meter los objetos
// NO ESTÁN METIDOS LOS OBJETOS!!!!

const mySeries = document.querySelector('.my__series');

// <------  Search series
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

//<---- Favourite series
function fav(){
  const favSerie = event.currentTarget;
  favSerie.classList.add('fav__serie');

  //Añadir las clases fav__title / fav__img
  const favTitle = event.currentTarget.firstChild;
  favTitle.classList.add('fav__title');

  const favImg = event.currentTarget.lastChild;
  favImg.classList.add('fav__img');

  //Hacemos objeto
  const obj = {title: `${favTitle.innerHTML}`,
    photo: `${favImg.src}`};

  arrFav.push(obj);
  saveData();
  console.log('!!', arrFav); //¿Esto es array, no?
  //En un array (?). No, se van sustituyendo los objetos, no añadiendo
  //Este objeto debería ir en un array!!!

  ///Pintar lista de favoritos
  const myTitle = document.createElement('h3'); //el que se repite
  const favResult = document.createElement('ul');
  favResult.classList.add('fav__serie');
  const favList = document.createElement('li');
  favList.classList.add('my__serie');
  const arrTitle = document.createElement('h4');
  arrTitle.classList.add('my__title');
  const arrImg = document.createElement('img');
  arrImg.classList.add('my__image');
  // my_image o my__image, no cambia a doble barrabaja

  const myTitleCont = document.createTextNode('Mis series favoritas'); //se repite
  const arrTitleCont = document.createTextNode(`${obj.title}`);
  arrImg.setAttribute('src', `${obj.photo}`);
  arrImg.setAttribute('alt', `Portada de ${obj.title}`);

  myTitle.appendChild(myTitleCont); //no lo estoy pintando porque se repite
  arrTitle.appendChild(arrTitleCont);
  favList.appendChild(arrTitle);
  favList.appendChild(arrImg);
  favResult.appendChild(favList);

  //mySeries.appendChild(myTitle); //El 'mis series favoritas se repite cada vez
  mySeries.appendChild(favResult);
}

// <----- Save Data (LocalStorage)
function saveData(){
  localStorage.setItem('favSeries', JSON.stringify(arrFav));
}
function print(){
  const nuevo = JSON.parse(localStorage.getItem('favSeries'));
  if(nuevo !== null) {
    for(let x=0; x<nuevo.length; x++){
      const myTitle = document.createElement('h3'); //el que se repite
      const favResult = document.createElement('ul');
      favResult.classList.add('fav__serie');
      const favList = document.createElement('li');
      favList.classList.add('my__serie');
      const arrTitle = document.createElement('h4');
      arrTitle.classList.add('my__title');
      const arrImg = document.createElement('img');
      arrImg.classList.add('my__image');

      const myTitleCont = document.createTextNode('Mis series favoritas'); //se repite
      const arrTitleCont = document.createTextNode(`${nuevo[x].title}`);
      arrImg.setAttribute('src', `${nuevo[x].photo}`);
      arrImg.setAttribute('alt', `Portada de ${nuevo[x].title}`);

      myTitle.appendChild(myTitleCont); //no lo estoy pintando porque se repite
      arrTitle.appendChild(arrTitleCont);
      favList.appendChild(arrTitle);
      favList.appendChild(arrImg);
      favResult.appendChild(favList);

      //mySeries.appendChild(myTitle); //El 'mis series favoritas se repite cada vez
      mySeries.appendChild(favResult);
    }
  } else {
    console.log('ecooooo o');
  }
}

window.addEventListener('load', print);
