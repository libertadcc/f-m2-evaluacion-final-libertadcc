'use strict';

const url = 'http://api.tvmaze.com/search/shows?q=';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const results = document.querySelector('.results');

const arrFav = []; //EN este array tenemos que meter los objetos

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
//A la funcion fav hay que meterle un parámetro que serán los objetos de cuando se selecciona una peli
function fav(){
  const allSeries = document.querySelectorAll('.result__serie');
  //for(let each of allSeries){
  //Selecciona fav y le añade la clase
  const favSerie = event.currentTarget;
  favSerie.classList.add('fav__serie');

  //Añadir las clases fav__title / fav__img
  const favTitle = event.currentTarget.firstChild;
  favTitle.classList.add('fav__title');

  const favImg = event.currentTarget.lastChild;
  favImg.classList.add('fav__img');

  //Hacemos objeto
  console.log(favTitle.innerHTML);
  const obj = {title: `${favTitle.innerHTML}`,
    photo: `${favImg.src}`};
  console.log('!!!!!', obj);

  const arrayList = arrFav.push(obj);
  const arrTitle = document.createElement('h4');
  const arrTitleCont = document.createTextNode(`${obj.title}`);
  const arrImg = document.createElement('img');
  arrImg.setAttribute('src', `${obj.photo}`);

  const favResult = document.querySelector('.fav__result');
  const favList = document.createElement('li');

  arrTitle.appendChild(arrTitleCont);
  favList.appendChild(arrTitle);
  favList.appendChild(arrImg);

  //favList.appendChild(arrayList);
  favResult.appendChild(favList);
  //Crear un array con los títulos seleccionados y meterlo en favResult
  //}
  //} del bucle
}