// loguin con validacion
const botonIngresar = document.getElementById("ingresar");
const resultado = document.querySelector(".resultado");
const email = document.getElementById("loguinEmail");
const contraseña = document.getElementById("loguinContraseña");


const obtenerUsuario = ()=>{
  fetch('http://localhost:3000/users')
  .then(response=>response.json())
  .then(response => {
     for (let i = 0; i < response.length; i++) {
       const arrayRecorrido= response[i];
       console.log(arrayRecorrido);
      if(arrayRecorrido.email == email.value && arrayRecorrido.contraseña == contraseña.value
        && arrayRecorrido.profile == "user"){
        window.location = "home.html";
        return true;
      }else if(arrayRecorrido.email == email.value && arrayRecorrido.contraseña == contraseña.value
        && arrayRecorrido.profile == "admin" ){
          window.location = "administracion.html";
          return true;
        }
      else{ 
        return false;
      }  
     } 
  })
}
//iniciar secion
botonIngresar.addEventListener("click",(e)=>{
  e.preventDefault();
  let errors = validarCampos();
  if(errors.length > 0){
    resultado.innerHTML = errors;
    resultado.classList.add("red");
  }else{
    resultado.innerHTML = "Solicitud correcta";
    resultado.classList.add("green");
    obtenerUsuario();
  }
 });
 
const validarCampos = ()=>{
const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
let error =[];
if (regExpEmail.test(email.value)){
    error.push({error:true,msg:"El email es invalido"}) ; 
   }  
   if(contraseña.value == " " || contraseña.value.lenght < 4 || contraseña.value.lenght >20) {
    error.push({error:true,msg:"La contraseña debe ser mayor a cuatro caracteres"}) ;
  } 
  return error;
 }
 function mayus(e) {
  e.value = e.value.toUpperCase();
}




  
    