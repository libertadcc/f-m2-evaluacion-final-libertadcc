'use strict';

const url = 'http://api.tvmaze.com/search/shows?q=';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const results = document.querySelector('.results');
const mySeriesTitle = document.querySelector('.my__series-title');
const mySeries = document.querySelector('.my__series');
const btnDelete = document.querySelector('.btn__delete');

let arrFav = [];

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
  mySeriesTitle.classList.remove('hidden');
  btnDelete.classList.remove('hidden');

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

  ///Pintar lista de favoritos
  const favResult = document.createElement('ul');
  favResult.classList.add('fav__serie');
  const favList = document.createElement('li');
  favList.classList.add('my__serie');
  const arrTitle = document.createElement('h4');
  arrTitle.classList.add('my__title');
  const arrImg = document.createElement('img');
  arrImg.classList.add('my__image');

  const arrTitleCont = document.createTextNode(`${obj.title}`);

  const iconX = document.createElement('span');
  iconX.classList.add('my__icon');
  iconX.innerHTML= '<i class="fas fa-times-circle"></i>';

  arrImg.setAttribute('src', `${obj.photo}`);
  arrImg.setAttribute('alt', `Portada de ${obj.title}`);

  arrTitle.appendChild(arrTitleCont);
  favList.appendChild(arrImg);
  favList.appendChild(arrTitle);
  favList.appendChild(iconX);

  favResult.appendChild(favList);

  mySeries.appendChild(favResult);

  iconX.addEventListener('click', deletefav);
}

// <----- Save Data (LocalStorage)
function saveData(){
  localStorage.setItem('favSeries', JSON.stringify(arrFav));
}

// <---- Print localStorage
function print(arr){
  const nuevo = JSON.parse(localStorage.getItem('favSeries'));
  if(nuevo !== null) {
    mySeriesTitle.classList.remove('hidden');
    btnDelete.classList.remove('hidden');

    for(let x=0; x<nuevo.length; x++){
      const myTitle = document.createElement('h3');
      const favResult = document.createElement('ul');
      favResult.classList.add('fav__serie');
      const favList = document.createElement('li');
      favList.classList.add('my__serie');

      const arrTitle = document.createElement('h4');
      arrTitle.classList.add('my__title');
      const arrImg = document.createElement('img');
      arrImg.classList.add('my__image');

      const myTitleCont = document.createTextNode('Mis series favoritas');
      const arrTitleCont = document.createTextNode(`${nuevo[x].title}`);

      // Add icon
      const iconX = document.createElement('span');
      iconX.classList.add('my__icon');
      iconX.innerHTML= '<i class="fas fa-times-circle"></i>';

      arrImg.setAttribute('src', `${nuevo[x].photo}`);
      arrImg.setAttribute('alt', `Portada de ${nuevo[x].title}`);
      myTitle.appendChild(myTitleCont);
      arrTitle.appendChild(arrTitleCont);
      favList.appendChild(arrImg);
      favList.appendChild(arrTitle);
      favList.appendChild(iconX);

      favResult.appendChild(favList);

      mySeries.appendChild(favResult);

      iconX.addEventListener('click', deletefav);
      console.log('Hay series favoritas guardadas');
    }
  } else {
    console.log('Aún no hay series favoritas guardadas');
  }
}

window.addEventListener('load', print(arrFav));

// <----- Delete fav
//Al clicar la X borrar de la lista de favoritos///Revisar esto porque no se cómo borrar solo un elemento del localStorage
function deletefav(event){
  const clicked = event.currentTarget;
  const clickedLi = clicked.parentElement;
  clickedLi.classList.add('hidden');
  localStorage.removeItem('event');
}

function deleteLocalStorage(){
  localStorage.clear();
  print(arrFav);
  mySeriesTitle.classList.add('hidden');
  mySeries.classList.add('hidden');
  btnDelete.classList.add('hidden');

}
btnDelete.addEventListener('click', deleteLocalStorage);