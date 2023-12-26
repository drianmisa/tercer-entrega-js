let contenedor = document.querySelector(".contenedor_main");
let botonInicio = document.querySelector("#btn-inicio");
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function iniciarPrograma(event) {
    event.preventDefault();
    contenedor.innerHTML = `
        <form class="form-inicio">
            <legend>Este es el título del formulario</legend>
            <input type="text" name="nombre" id="nombre" placeholder="Nombre">
            <input type="email" name="correo" id="correo" placeholder="Correo Electrónico">
            <input type="tel" name="telefono" id="telefono" placeholder="Teléfono (10 dígitos)">  
            <div id="datosMostrados"></div>   
            <input id="boton-enviar" class="btn" type="submit" value="Llenar datos">
        </form>`;

    mostrarDatosGuardados();
    
    let botonSubmit = document.querySelector("#boton-enviar");
    botonSubmit.addEventListener("click", validacionFormulario);

    limpiarDatosPasados();
}
botonInicio.addEventListener('click', iniciarPrograma);

function mostrarDatosGuardados() {
    let nombre = document.querySelector("#nombre");
    let correo = document.querySelector("#correo");
    let telefono = document.querySelector("#telefono");

    if (usuarios.length > 0) {
        nombre.value = usuarios[usuarios.length - 1].nombre || '';
        correo.value = usuarios[usuarios.length - 1].correo || '';
        telefono.value = usuarios[usuarios.length - 1].telefono || '';
    }
}

function validacionFormulario(event) {
    event.preventDefault();
    let nombre = document.querySelector("#nombre");
    let correo = document.querySelector("#correo");
    let telefono = document.querySelector("#telefono");
    
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let phoneRegex = /^\d{10}$/; 
    
    if (!nombre.value || !correo.value || !telefono.value) {
        alert("Por favor, completa todos los campos");
    } else if (!emailRegex.test(correo.value)) {
        alert("Por favor, introduce un correo electrónico válido");
    } else if (!phoneRegex.test(telefono.value)) {
        alert("Por favor, introduce un número de teléfono válido (10 dígitos)");
    } else {
        let nuevoUsuario = {
            nombre: nombre.value,
            correo: correo.value,
            telefono: telefono.value,
            fechaCreacion: Date.now()
        };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarDatosGuardados();
        elegirServicio();
    }
}

function limpiarDatosPasados() {
    const DOS_DIAS_MS = 2 * 24 * 60 * 60 * 1000;
    const ahora = Date.now();
    let usuariosFiltrados = usuarios.filter(usuario => ahora - usuario.fechaCreacion < DOS_DIAS_MS);
    
    if (usuariosFiltrados.length !== usuarios.length) {
        usuarios = usuariosFiltrados;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}
function elegirServicio(){
  contenedor.innerHTML = ``;
}



