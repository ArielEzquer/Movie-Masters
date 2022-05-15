let checksMovieFav = document.querySelectorAll(".fav-movie-checked");
let btnSave = document.querySelector("#btn-save");
let dbInitialStatus = [];
let dbInfoToChange = [];
let initialStatusChanged = false;
const getIdNumber = (idString) => {
  return idString.split("-")[1];
};

const eventChangeCheck = (e, previousFavId) => {
  if (e.target.id != previousFavId) {
    if (dbInfoToChange.find((item) => item.newFavId)) {
      dbInfoToChange[dbInfoToChange.length - 1].newFavId = e.target.id;
    } else {
      dbInfoToChange.push({ newFavId: e.target.id });
    }
    btnSave.classList.remove("btn-save-hide");
    btnSave.classList.add("btn-save");
    initialStatusChanged = true;
  } else {
    btnSave.classList.add("btn-save-hide");
    btnSave.classList.remove("btn-save");
  }
};

const getAllData = async (endpoint) => {
  try {
    let response = await fetch(`http://localhost:3000/${endpoint}`);
    let items = await response.json();
    items.forEach((item) => {
      dbInitialStatus.push({
        id: `radio-${item.id}`,
        fav: item.Principal,
        Title: item.Title,
        Year: item.Year,
        Genre: item.Genre,
        Actors: item.Actors,
        Poster: item.Poster,
        Images: item.Images,
      });
      initialStatusChanged = false;
      tableDataRows.innerHTML += `<tr ${
        !item.Available ? 'class="table-danger"' : ""
      }>
      <th scope="row">${item.id}</th>
      <td>${item.Title}${item.Principal ? `  [⭐️]` : ""}</td>
      <td>${item.Type === "movie" ? "Pelicula" : "Serie"}</td>
      <td>${item.Year}</td>
      <td>${item.Available ? "Si" : "No"}</td>
      <td><input type="radio" ${item.Principal ? `checked` : " "} 
      ${!item.Available ? "disabled" : " "}
      class="fav-movie-radio" name="fav-movie-group" id="radio-${item.id}"></td>
      <td><button type="button" class="icon-box" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <img src="../recursos/iconos/edit-alt.svg" alt="edit"></button></td>
      </tr>`;
    });
    let { id: previousFavId } = dbInitialStatus.find((item) => item.fav);
    dbInfoToChange.push({ previousFavId });
    checksMovieFav = document.querySelectorAll(".fav-movie-radio");
    checksMovieFav.forEach((check) => {
      check.addEventListener("change", (e) =>
        eventChangeCheck(e, previousFavId)
      );
    });
  } catch (error) {
    alert(`Ha ocurrido un error: ${e}`);
  }
};

let tableDataRows = document.querySelector("#table-data-rows");

btnSave.addEventListener("click", (e) => {
  let idPrevious = dbInfoToChange.find(
    (item) => item.previousFavId
  ).previousFavId;
  idPrevious = getIdNumber(idPrevious);

  let idChangeFav = dbInfoToChange.find((item) => item.newFavId).newFavId;
  idChangeFav = getIdNumber(idChangeFav);
  Promise.all([
    fetch(`http://localhost:3000/movies/${idPrevious}`, {
      method: "PATCH",
      body: JSON.stringify({
        Principal: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }),
    fetch(`http://localhost:3000/movies/${idChangeFav}`, {
      method: "PATCH",
      body: JSON.stringify({
        Principal: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }),
  ])
    .then((response) => {
      if (response.every((res) => res.ok || res.status === 200))
        window.location.reload();
    })
    .catch((e) => alert(`Ha ocurrido un error: ${e}`));
});

window.addEventListener("load", (e) => {
  getAllData("movies");
});
