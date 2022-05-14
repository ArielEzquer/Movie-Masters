//recuperacion contraseña
const emailR = document.getElementById("loguinEmailR");
const newPassword = document.getElementById("loguinContraseñaR");
const botonResetContraseña = document.getElementById("cambiarContraseña");
//fech
function obtenerRecup() {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((users) => {
      const user = users.find((u) => u.email === emailR.value);
      if (user) {
        modificarContraseña(user.id);
      } else {
        alert(`No existe un usuario registrado con el mail ${emailR.value}`);
      }
    });
}
function modificarContraseña(id) {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      password: newPassword.value,
      profile: "user",
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      alert("Contraseña modificado con exito");
      window.location = "./login.html"
    });
}
//recuperacion contraseña
botonResetContraseña.addEventListener("click", (e) => {
  e.preventDefault();
  obtenerRecup();
});
