// loguin con validacion
const botonIngresar = document.getElementById("ingresar");
const resultado = document.querySelector(".resultado");
const email = document.getElementById("loguinEmail");
const contraseña = document.getElementById("loguinContraseña");


const obtenerUsuario = ()=>{

  const userRelocation = {
    user: "./home/home.html",
    admin: "./admin/admin.html"
  }

  fetch('http://localhost:3000/users')
  .then(response=>response.json())
  .then(response => {
    console.log(response)
    const user =  response.find( u => u.email === email.value  && u.password === contraseña.value )
    if(user){
      window.location = userRelocation[user.profile];
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




  
    