
const profesionesM = ["Abogado", "Médico", "Ingeniero", "Profesor", "Psicólogo", "Arquitecto", "Periodista",
"Físico", "Farmacólogo", "Enfermero", "Electricista", "Bibliotecólogo", "Músico", "Traductor", "Contador"]

const profesionesF = ["Abogada", "Médica", "Ingeniera", "Profesora", "Psicóloga", "Arquitecta", "Periodista",
"Física", "Farmacóloga", "Enfermera", "Electricista", "Bibliotecóloga", "Música", "Traductora", "Contadora"]


const iconos = {
  profesion: '<i class="fi fi-ss-briefcase"></i> ',
  genero: '<i class="fi fi-ss-venus-mars"></i> ',
  nacionalidad: '<i class="fi fi-ss-world"></i> ',
  fechaDeNacimiento: '<i class="fi fi-ss-calendar-lines"></i> ',
  email: '<i class="fi fi-ss-envelope"></i> ',
  edad: '<i class="fi fi-ss-user-time"></i> ',
  telefono: '<i class="fi fi-ss-phone-call"></i> ',
  direccion: '<i class="fi fi-ss-home"></i> '
}

document.addEventListener("DOMContentLoaded", async function(){
  await nuevaPersona();
})

document.getElementById('boton').onclick = async function(){
  await nuevaPersona();
}

async function getData(){
  const respuesta = await fetch("https://randomuser.me/api/1.4/?nat=br,es,mx&exc=login,registered,phone");
  return respuesta.json();
}

function sortearData(respuesta){
  let persona = respuesta.results[0];
  let foto = persona.picture.large;
  let nombre = persona.name.first + " " + persona.name.last;
  let profesion;
  let genero;
  let fechaDeNacimiento;
  let nacionalidad;
  let email = persona.email
  let telefono = persona.cell
  let direccion = persona.location.street.name + " "
  + persona.location.street.number

  if (persona.gender == "male"){
    genero = "Género : Masculino"

    switch (persona.location.country){
      case "Brazil":
        nacionalidad = "Nacionalidad : Brasileño"
        break;
      case "Spain":
        nacionalidad = "Nacionalidad : Español"
        break;
      case "Mexico":
        nacionalidad = "Nacionalidad : Mexicano"
        break;
    }

    profesion = " " + profesionesM[profesionesM.length * Math.random() | 0]

  }

  if (persona.gender == "female"){
    genero = "Género : Femenino"

    switch (persona.location.country){
      case "Brazil":
        nacionalidad = "Nacionalidad : Brasileña"
        break;
      case "Spain":
        nacionalidad = "Nacionalidad : Española"
        break;
      case "Mexico":
        nacionalidad = "Nacionalidad : Mexicana"
        break;
    }

    profesion = profesionesF[profesionesF.length * Math.random() | 0]

  }

  let fecha = new Date(persona.dob.date);
  fechaDeNacimiento = "Fecha de nacimiento : " + fecha.toLocaleDateString();

  let edad = persona.dob.age + " años";

  data = {
    foto: foto,
    nombre: nombre,
    profesion: profesion,
    genero: genero,
    fechaDeNacimiento: fechaDeNacimiento,
    edad: edad,
    email: email,
    nacionalidad: nacionalidad,
    telefono: telefono,
    direccion: direccion,
  }

  return data
}

function actualizarHTML(data){
  // Excepciones que no se automatizan de la misma manera, es decir, aquellas que no contienen icono + data.
  document.getElementById('foto').src=data.foto
  document.getElementById('nombre').innerHTML=data.nombre

  // Las borramos para facilitar el for loop.
  delete data.foto
  delete data.nombre

  for (let elemento in data){
    document.getElementById(elemento).innerHTML=iconos[elemento] + data[elemento];
  }
}

async function nuevaPersona(){
  let data = await getData();
  actualizarHTML(sortearData(data));
}