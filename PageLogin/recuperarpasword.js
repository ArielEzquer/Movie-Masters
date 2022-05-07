//recuperacion contraseña
const emailR = document.getElementById("loguinEmailR");
const contrseñaR = document.getElementById("loguinContraseñaR");
const botonResetContraseña = document.getElementById("cambiarContraseña");
//fech
function obtenerRecup(){
  fetch('http://localhost:3000/users')
  .then(response=>response.json())
  .then(response => {
     for (let i = 0; i < response.length; i++) {
       const arrayRecorrido= response[i];
       console.log(arrayRecorrido);
      if(arrayRecorrido.email == emailR.value ){
       modificarContraseña();
        return true;
      }else{ 
        return false;
      }  
     } 
  })
}
function modificarContraseña(){
  fetch('http://localhost:3000/users',{
    method:'PATH',
    body: JSON.stringify({
      "password":contraseñaR.value,
      "profile":"user"}),
      Headers:{
        'content-type': 'aplication/jason; charset=UTF8'
      }
    })
    .then(response=>response.jason())
    .then(response=>console.log(response))
    }
    //recuperacion contraseña
botonResetContraseña.addEventListener("click",(e)=>{
  e.preventDefault();
   obtenerRecup();
  
});