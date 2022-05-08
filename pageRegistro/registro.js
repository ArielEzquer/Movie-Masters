const apellido = document.getElementById('apellido');
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const contraseña = document.getElementById("contraseña");
const btnRegistro = document.getElementById("btnRegistro");
const btnCancelar = document.getElementById("btnCancelar");
const resultado1 = document.querySelector(".resultado1");

btnRegistro.addEventListener("click",(e)=>{
  e.preventDefault();
 /* obtenerUsuario()  */
  let errors = validarCamposReg();
  if(errors){
    resultado1.innerHTML = errors;
    resultado1.classList.add("red");
  }else{
    resultado1.innerHTML = "Solicitud correcta,Ahora ingresa y disfruta!";
    resultado1.classList.add("green");
    agregarUsuario(apellido.value,nombre.value,usuario.value,email.value,contraseña.value);
    limpiarFormulario();
  }
}) 
//validaciones
const validarCamposReg = ()=>{
  let error =[];
  const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
  //inicio validaciones
  if (regExpEmail.test(email.value) ) {
     error.push({error: true, msg:"El email es invalido"});
   }else if(contraseña.value.trim() == "" ||contraseña.value.lenght < 4 ||  contraseña.value.lenght >20) {
    error.push({error: true, msg:"La contraseña debe ser mayor a cuatro caracteres"});  
  } else if(apellido.value.lenght<3 || apellido.value.lenght> 40 ||nombre.value.lenght<3 || nombre.value.lenght > 40 ){
    error.push({error: true, msg:"Corregir campos Apellido y Nombre"}); 
  }

}
function mayus(e) {
  e.value = e.value.toUpperCase();
}
function limpiarFormulario() {
  document.getElementById("registro").reset();
}
//fetch

const obtenerUsuario = ()=>{
  fetch('http://localhost:3000/users')
  .then(response=>response.json())
  .then(response => {
     for (let i = 0; i < response.length; i++) {
       const arrayRecorrido= response[i].email;
       console.log(arrayRecorrido);
      if(arrayRecorrido == email.value){
        alert('el mail ya exite!')
        return true;
      }else{ 
        return false;
      } 
     } 
  })
}

 function agregarUsuario(apell,nomb,user,mail,contr){
   console.log("datos",apell,nomb,user,mail,contr)
  fetch('http://localhost:3000/users',{
  method:'POST',
  body: JSON.stringify({
    "lastname":apell,
    "firstname":nomb,
    "username":user,
    "email": mail,
    "password":contr,
    "profile":"user"
  }),
    Headers:{
      'Content-Type': 'application/javascript'
    }
  })
  .then(response =>console.log(response))
  .then(response => console.log(response))
  } 
  // error de cors => response 