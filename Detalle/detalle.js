let tituloContenido = document.querySelector("#titulo-destacada");
let descripcionContenido = document.querySelector("#desc-par");
let contentPoster = document.querySelector(".pelicula-principal");
let contentImgs = document.querySelector(".img-content");

const params = new URLSearchParams(window.location.search);
const contentToFind = params.get("id");

fetch(`http://localhost:3000/movies/${contentToFind}`)
  .then((response) => response.json())
  .then((content) => {
    tituloContenido.innerText = content.Title;
    contentPoster.style.backgroundImage = `url('${content.Images[0]}')`;
    descripcionContenido.innerText = content.Plot;
    content.Images.forEach(img => {
        contentImgs.innerHTML += `<img class="img-ind" src="${img}" alt="imagen contenido">`
    });    
  })
  .catch((e) => alert(`Ha ocurrido un error: ${e}`));