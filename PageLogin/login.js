// loguin con validacion
const botonIngresar = document.getElementById("ingrersar");
const botonResetContraseña = document.getElementById("cambiarContraseña");
const resultado = document.querySelector(".resultado");
let email = document.getElementById("loguinEmail");
let contraseña = document.getElementById("loguinContraseña");
let emailR= document.getElementById("loguinEmailR");
let contrseñaR = document.getElementById("loguinContraseñaR");
//ingresar
botonIngresar.addEventListener("click",(e)=>{
  e.preventDefault();
  let error = validarCampos();
  if(error[0]){
    resultado.innerHTML = error[1];
    resultado.classList.add("red");
  }else{
    resultado.innerHTML = "Solicitud correcta";
    resultado.classList.add("green");
  }
 });
 
const validarCampos = ()=>{
const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
let error =[];
  if (email.value.lenght < 5 || email.value.lenght>50 
    ||regExpEmail.test(email.value)){
     error[0]= true;
     error[1] = "El email es invalido";
     return error;
   } else if(contraseña.value == " " || contraseña.value.lenght < 4 || contraseña.value.lenght >20) {
    error[0]= true;
    error[1] = "La contraseña debe ser mayor a cuatro caracteres";
    return error; }
    else if(email.value == recorrerRegistro.email.value && contraseña.value == recorrerRegistro.email.value
       && recorrerRegistro.profile.value == "user" ){
    window.location = "home.html";
   }else if(email.value == recorrerRegistro.email.value && contraseña.value == recorrerRegistro.email.value
    && recorrerRegistro.profile.value == "admin" ){
      window.location = "administracion.html";
   }
   else{
     error[0]= true;
     error[1]="Ingreso no valido";
     return error;
   }  
   error[0]= false;
   return error; 
 }
 function mayus(e) {
  e.value = e.value.toUpperCase();
}

//recuperacion contraseña
botonResetContraseña.addEventListener("click",(e)=>{
  e.preventDefault();
  Comparar();
  if (recorrerRegistro.email.value == emailR.value) {
    modificarContraseña();
  }
});

function Comparar(){
  for (let i = 0; i < obtenerUsuario().lenght; i++) {
  let recorrerRegistro = obtenerUsuario()[i]; 
  console.log(recorrerRegistro); 
}
}

//fech
function obtenerUsuario(){
fech('http://localhost:3000/users')
.then(response=>response.jason())
.then(response=>console.log(response))
}

function modificarContraseña(){
  fech('http://localhost:3000/users',{
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
  
    