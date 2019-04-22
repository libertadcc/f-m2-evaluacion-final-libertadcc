'use strict';

const url = 'http://api.tvmaze.com/search/shows?q=';

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

function search(){
  fetch(`${url}${input.value}`)
    .then(response => response.json())
    .then(data => {
      for(let i = 0; i<data.length; i++){
        const results = document.querySelector('.results');
        const item = document.createElement('li');
        const title = document.createElement('h2');
        const img = document.createElement('img');
        const serie = data[i].show;

        const contName = document.createTextNode(`${serie.name}`);

        const printImg =() =>{
          if(serie.image === null){
            img.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
            item.appendChild(img);
          } else {
            img.setAttribute('src', `${serie.image.medium}`);
            item.appendChild(img);
          }
        };
        printImg();
        // img.setAttribute('src', `${serie.image.medium}`);
        console.log(serie);
        //console.log(serie.image.medium);
        title.appendChild(contName);
        item.appendChild(title);

        img.setAttribute('alt', `Portada de ${serie.name}`);
        item.appendChild(img);
        results.appendChild(item);

      }

      // results.innerHTML='';

    });
}

btn.addEventListener('click', search);
