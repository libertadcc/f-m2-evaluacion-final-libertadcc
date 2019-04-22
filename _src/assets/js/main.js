'use strict';

const url = 'http://api.tvmaze.com/search/shows?q=';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const results = document.querySelector('.results');

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
  const allSeries = document.querySelectorAll('.result__serie');
  for(let each of allSeries){
    //Selecciona fav y le añade la clase
    const favSerie = event.currentTarget;
    favSerie.classList.add('fav__serie');
    console.log(favSerie);
    const favTitle = event.currentTarget.firstChild;
    favTitle.classList.add('fav__title');
    console.log(favTitle);
    const favImg = event.currentTarget.lastChild;
    favImg.classList.add('fav__img');

    const favs =[
      
    ];

    const favResult = document.querySelector('.fav__result');
    

    //Crear un array con los títulos seleccionados y meterlo en favResult
  }
}

//<----- My favourite series
