let contenedor = document.querySelector(".contenedor_main");
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let servicio1; // Variable para almacenar la referencia al servicio 1

function iniciarPrograma(event) {
    event.preventDefault();
    contenedor.innerHTML = `
        <form class="form-inicio">
            <legend>Este es el título del formulario</legend>
            <input type="text" name="nombre" id="nombre" placeholder="Nombre">
            <input type="email" name="correo" id="correo" placeholder="Correo Electrónico">
            <input type="tel" name="telefono" id="telefono" placeholder="Teléfono (10 dígitos)">  
            <div id="datosMostrados"></div>   
            <button id="btn-limpiar">Limpiar datos</button>
            <input id="boton-enviar" class="btn" type="submit" value="Llenar datos">
        </form>`;

    const btnLimpiar = document.querySelector("#btn-limpiar");
    btnLimpiar.addEventListener('click', limpiarLocalStorage);

    mostrarDatosGuardados();

    let botonSubmit = document.querySelector("#boton-enviar");
    botonSubmit.addEventListener("click", validacionFormulario);

    limpiarDatosPasados();
}

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

function limpiarLocalStorage() {
    localStorage.removeItem('usuarios');
    usuarios = [];
    iniciarPrograma();
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

function elegirServicio() {
    const nombreUsuario = usuarios[0].nombre;
    contenedor.innerHTML = `
        <h2 style="">Hola ${nombreUsuario} elige el servicio que necesitas</h2>
        <div class="grid-form">
            <div class="item-form">
                <div id="servicio1">
                    <img src="content/imagen-demo.jpg">
                    <h3>Servicio 1</h3>
                </div>
            </div>
            <div class="item-form">
                <div id="servicio2">
                    <img src="content/imagen-demo.jpg">
                    <h3>Servicio 2</h3>
                </div>              
            </div>
        </div>`;

    let servicio1 = document.querySelector("#servicio1");
    let servicio2 = document.querySelector("#servicio2");

    servicio1.addEventListener("click", () => {
        let primerServicio = servicio1.textContent;
        estado(primerServicio);
    });

    servicio2.addEventListener("click", () => {
        let segundoServicio = servicio2.textContent;
        estado(segundoServicio);
    });
}

function estado(servicioSeleccionado) {
    let servicio = servicioSeleccionado;
    contenedor.innerHTML = `
        <h2>Selecciona tu ciudad</h2>
        <div class="botones-estado">
            <span class="btn">
                Tijuana
            </span>
            <span class="btn">
                Durango
            </span>
            <span class="btn">
                Chihuahua
            </span>
            <span class="btn">
                San Luis Potosí
            </span>
        </div>
    `;
    const botonesEstado = document.querySelectorAll('.botones-estado .btn');
    let ciudadSeleccionada = '';

    botonesEstado.forEach(boton => {
        boton.addEventListener('click', (event) => {
            ciudadSeleccionada = event.target.textContent.trim();
           seleccioncontacto(servicio, ciudadSeleccionada);
        });
    });
}
function seleccioncontacto(ser, ciu){
    ser = ser.trim();
    ciu = ciu.trim();
    contenedor.innerHTML = `   
        <div class="grid-contacto">
            <div class="item-contacto">
                <img src="content/icono-envelope.png">
                <h3>Mensaje</h3>
            </div>
            <div class="item-contacto">
                <img src="content/icono-telefono.png">
                <h3>Llamar</h3>
            </div>
            <div class="item-contacto">
                <img src="content/whatsApp.png">
                <h3>WhatsApp</h3>
            </div>
        </div>`;
    let callSeleccionada = document.querySelectorAll('.item-contacto');
    for (let inconoContacto of callSeleccionada) {
        inconoContacto.addEventListener('click', ()=>{
            let datos = inconoContacto.textContent.trim();
            enviar(datos);
        });        
    }
    function enviar(datos){
        if (ser === 'Servicio 1') {
            if (ciu === "Tijuana") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            } else if (ciu === "Durango") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            } else if (ciu === "Chihuahua") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            } else if (ciu === "San Luis Potosí") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            }
        } else if (ser === 'Servicio 2') {
            if (ciu === "Tijuana") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            } else if (ciu === "Durango") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            } else if (ciu === "Chihuahua") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            } else if (ciu === "San Luis Potosí") {
                if (datos === "Mensaje") {
                    alert(`${ser} en la ${ciu}, Formulario`);
                } else if (datos === "Llamar") {
                    alert(`${ser} en la ${ciu}, Llamada`);
                } else if (datos === "WhatsApp") {
                    alert(`${ser} en la ${ciu}, WhatsApp`);
                }
            }
        }

    }
}
function cerrar(){
    contenedor.innerHTML=`
    <button id="btn-inicio" class="btn">
        Solicitar informacion
    </button>`;
}
let botonInicio = document.querySelector("#btn-inicio");
botonInicio.addEventListener('click', iniciarPrograma);
 