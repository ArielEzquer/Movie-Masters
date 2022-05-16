let tituloDestacada = document.querySelector("#titulo-destacada");
let descripcionDestacada = document.querySelector("#descripcion-destacada");
let imgDestacada = document.querySelector("#img-destacada");
let carouselTendencias = document.querySelector("#tendencias .carousel");
let carouselAccion = document.querySelector("#accion .carousel");
let carouselSeries = document.querySelector("#series .carousel");
let carouselTerror = document.querySelector("#terror .carousel");

const fila = document.querySelector(".contenedor-carousel");
const peliculas = document.querySelectorAll(".pelicula");

const flechaIzquierda = document.getElementById("flecha-izquierda");
const flechaDerecha = document.getElementById("flecha-derecha");

// Event Listener para la flecha derecha.
flechaDerecha.addEventListener("click", () => {
  fila.scrollLeft += fila.offsetWidth;

  const indicadorActivo = document.querySelector(".indicadores .activo");
  if (indicadorActivo.nextSibling) {
    indicadorActivo.nextSibling.classList.add("activo");
    indicadorActivo.classList.remove("activo");
  }
});

// Event Listener para la flecha izquierda.
flechaIzquierda.addEventListener("click", () => {
  fila.scrollLeft -= fila.offsetWidth;

  const indicadorActivo = document.querySelector(".indicadores .activo");
  if (indicadorActivo.previousSibling) {
    indicadorActivo.previousSibling.classList.add("activo");
    indicadorActivo.classList.remove("activo");
  }
});

// Paginacion
const numeroPaginas = Math.ceil(peliculas.length / 5);
for (let i = 0; i < numeroPaginas; i++) {
  const indicador = document.createElement("button");

  if (i === 0) {
    indicador.classList.add("activo");
  }

  document.querySelector(".indicadores").appendChild(indicador);
  indicador.addEventListener("click", (e) => {
    fila.scrollLeft = i * fila.offsetWidth;

    document.querySelector(".indicadores .activo").classList.remove("activo");
    e.target.classList.add("activo");
  });
}

// Hover
peliculas.forEach((pelicula) => {
  pelicula.addEventListener("mouseenter", (e) => {
    const elemento = e.currentTarget;
    setTimeout(() => {
      peliculas.forEach((pelicula) => pelicula.classList.remove("hover"));
      elemento.classList.add("hover");
    }, 300);
  });
});

fila.addEventListener("mouseleave", () => {
  peliculas.forEach((pelicula) => pelicula.classList.remove("hover"));
});

fetch("http://localhost:3000/movies")
  .then((response) => response.json())
  .then((movies) => {
    let peliculaDestacada = movies.find((x) => x.Principal);
    tituloDestacada.innerText = peliculaDestacada.Title;
    descripcionDestacada.innerText = peliculaDestacada.Plot;
    imgDestacada.style.background = ` linear-gradient(rgba(0, 0, 0, .50) 0%, rgba(0,0,0,.50) 100%), url(${peliculaDestacada.Images[0]})`;

    // Tendencias
    movies.forEach((movie) => {
      carouselTendencias.innerHTML += `<div class="pelicula">
		<a href="#"><img src="${movie.Poster}" alt=""></a>
	</div>`;
    });

    //Accion
    let accion = movies.filter((a) => a.Genre.includes('Action'))
    accion.forEach((a) => {
		carouselAccion.innerHTML += `<div class="pelicula">
		  <a href="#"><img src="${a.Poster}" alt=""></a>
		</div>`;
	})
	
    // Terror
    let terror = movies.filter((m) =>
      m.Genre.includes(["Crime", "Drama", "Thriller", "Terror"])
    );
    terror.forEach((t) => {
      carouselTerror.innerHTML += `<div class="pelicula">
	<a href="#"><img src="${t.Poster}" alt=""></a>
	</div>`;
    });

    //Series
    let series = movies.filter((movie) => movie.Type === "series");
    series.forEach((s) => {
      carouselSeries.innerHTML += `<div class="pelicula">
	<a href="#"><img src="${s.Poster}" alt=""></a>
	</div>`;
    });
  });
