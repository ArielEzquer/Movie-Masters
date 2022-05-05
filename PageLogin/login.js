// loguin con validacion
const botonIngresar = document.getElementById("ingrersar");
const resultado = document.querySelector(".resultado");
const bienvenido = document.querySelector(".bienvenido");
let email = document.getElementById("loguinEmail").value;
let contraseña = document.getElementById("loguinContraseña").value;
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

let emailReg =localStorage.getItem("registroMail").match(email);
let contraseñaReg = localStorage.getItem("registroContraseña").match(contraseña);
   let error =[];
   if (email.lenght < 5 || email.lenght>50 
    ||regExpEmail.test(email)){
     error[0]= true;
     error[1] = "El email es invalido";
     return error;
   } else if(contraseña.value == " " || contraseña.value.lenght < 4 || contraseña.value.lenght >20) {
    error[0]= true;
    error[1] = "La contraseña debe ser mayor a cuatro caracteres";
    return error; }
    else if(email == emailReg && contraseña == contraseñaReg){
    window.location = "index2.html";
    bienvenido.innerHTML = `Bienvenido ${email.value}`;
   }else{
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
function obtenerUsuario(){
fech('http://localhost:3000/users')
.then(response=>response.jason())
.then(response=>console.log(response))
}

function modificarContraseña(){
  fech('http://localhost:3000/users',{
    method:'PATH',
    body: JSON.stringify({
      "password":contraseña.value,
      "profile":"user"}),
      Headers:{
        'content-type': 'aplication/jason; charset=UTF8'
      }
    })
    .then(response=>response.jason())
    .then(response=>console.log(response))
    }
