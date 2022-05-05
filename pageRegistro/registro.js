const apellido = document.getElementById("apellido");
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const contraseña = document.getElementById("contraseña");
const btnRegistro = document.getElementById("btnRegistro");
const btnCancelar = document.getElementById("btnCancelar");
const resultado1 = document.querySelector(".resultado1");

btnRegistro.addEventListener("click",(e)=>{
  e.preventDefault();
  let error = validarCamposReg();
  if(error[0]){
    resultado1.innerHTML = error[1];
    resultado1.classList.add("red");
  }else{
    agregarUsuario();
    resultado1.innerHTML = "Solicitud correcta,Ahora ingresa y disfruta!";
    resultado1.classList.add("green");
    limpiarFormulario();
  }
})
const validarCamposReg= ()=>{
  let error =[];
  const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
  if (regExpEmail.test(email.value) || email.value == obtenerUsuario().email) {
     error[0]= true;
     error[1] = "El email es invalido";
     return error;
   }else if(contraseña.value == " " ||contraseña.value.lenght < 4 ||  contraseña.value.lenght >20) {
    error[0]= true;
    error[1] = "La contraseña debe ser mayor a cuatro caracteres";
    return error; 
  } else if(apellido.value.lenght<3 || apellido.value.lenght> 40 ||nombre.value.lenght<3 || nombre.value.lenth > 40 ){
    error[0]= true;;
    error[1] = "Corregir campos Apellido y Nombre";
    return error;
  }else if(usuario.value == obtenerUsuario().username|| email.value == obtenerUsuario().email){
    error[0]= true;;
    error[1] = "ya existe ese usuario";
    return error;
  }
  error[0]= false;
  return error;
}
function mayus(e) {
  e.value = e.value.toUpperCase();
}
function limpiarFormulario() {
  document.getElementById("registro").reset();
}

function limpiarFormulario() {
  document.getElementById("registro").reset();
}
function obtenerUsuario(username){
  fech(`http://localhost:3000/${username}`)
  .then(response=>response.jason())
  .then(response=>console.log(response))
  }
function agregarUsuario(){
  fech('http://localhost:3000/users',{
  method:'POST',
  body: JSON.stringify({
    "lastname":apellido.value,
    "firstname":nombre.value,
    "username":usuario.value,
    "email": email.value,
    "password":contraseña.value,
    "profile":"user"}),
    Headers:{
      'content-type': 'aplication/jason; charset=UTF8'
    }
  })
  .then(response=>response.jason())
  .then(response=>console.log(response))
  }