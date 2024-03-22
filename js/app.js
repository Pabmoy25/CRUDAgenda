import Contacto from "./classContacto.js";
import { validarCantidadCaracteres, validarEmail } from "./validaciones.js";
//Create - Read - Update - Delete contactos
// const contacto = new Contacto(1, 'Juan', 'Pérez', 'juan.perez@email.com', '555-123-4567');

const modalAdminContacto = new bootstrap.Modal(
  document.getElementById("administrarContacto")
);
const btnAgregarContacto = document.getElementById("btnNuevoContacto");
const formularioContacto = document.querySelector("form");
const nombre = document.getElementById("nombre"),
  apellido = document.getElementById("apellido"),
  celular = document.getElementById("celular"),
  email = document.getElementById("email");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

//funciones
const mostrarModal = () => {
  limpiarFormulario();
  modalAdminContacto.show();
};

const crearContacto = (e) => {
  e.preventDefault();
  
  const idContacto = formularioContacto.getAttribute('data-id-contacto');
  
  if (validarCantidadCaracteres(nombre.value, 2, 20) && validarCantidadCaracteres(apellido.value, 2, 20) && validarEmail(email.value)) {
    if (idContacto) {
      // Estamos editando un contacto existente
      const contactoAEditar = agenda.find(itemContacto => itemContacto.id === idContacto);
      if (contactoAEditar) {
        contactoAEditar.nombre = nombre.value;
        contactoAEditar.apellido = apellido.value;
        contactoAEditar.email = email.value;
        contactoAEditar.celular = celular.value;
      }
      Swal.fire({
        title: "Contacto editado",
        text: `El contacto ${nombre.value} fue editado correctamente`,
        icon: "success",
      });
      

    } else {
      // Creación de un nuevo contacto
      const nuevoContacto = new Contacto(undefined, nombre.value, apellido.value, email.value, celular.value);
      agenda.push(nuevoContacto);
      crearFila(nuevoContacto, agenda.length);
      Swal.fire({
        title: "Contacto creado",
        text: `El contacto ${nombre.value} fue creado correctamente`,
        icon: "success",
      });
    }
    limpiarFormulario();
    guardarEnLocalstorage();
    modalAdminContacto.hide();
    formularioContacto.removeAttribute('data-id-contacto');
  } else {
    alert('Hay errores en el formulario');
  }
};

window.editarContacto = (idContacto) => {
  const contactoAEditar = agenda.find(itemContacto => itemContacto.id === idContacto);
  if (contactoAEditar) {
    nombre.value = contactoAEditar.nombre;
    apellido.value = contactoAEditar.apellido;
    celular.value = contactoAEditar.celular;
    email.value = contactoAEditar.email;
    
    formularioContacto.setAttribute('data-id-contacto', idContacto);
    modalAdminContacto.show();
    
  }
};


function limpiarFormulario() {
  formularioContacto.reset();
}

function guardarEnLocalstorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}

function crearFila(contacto, fila) {
  const tablaContactos = document.querySelector("tbody");
  tablaContactos.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.celular}</td>
    <td>
    <button class="btn btn-primary" onclick="verDetalleContacto('${contacto.id}')">Ver detalle</button>
    <button class="btn btn-warning me-1" onclick="editarContacto('${contacto.id}')">Editar</button>
    <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
    </td>
  </tr>`;
}

function cargaInicial() {
  if (agenda.length > 0) {
    agenda.map((itemContacto, posicion) =>
      crearFila(itemContacto, posicion + 1)
    );

    // const tablaContactos = document.querySelector('tbody');
    // for(let i=0; i < agenda.length; i++)
    // {
    //   tablaContactos.innerHTML += `<tr>
    //   <th scope="row">${i++}</th>
    //   <td>${agenda[i].nombre}</td>
    //   <td>${agenda[i].apellido}</td>
    //   <td>${agenda[i].email}</td>
    //   <td>${agenda[i].celular}</td>
    //   <td>
    //     <button class="btn btn-warning">Editar</button
    //     ><button class="btn btn-danger">Borrar</button>
    //   </td>
    // </tr>`
    // }
  }
  //agregar un cartel informativo para el usuario
}
window.borrarContacto = (idContacto) => {
  Swal.fire({
    title: "¿Estas seguro que quieres borrar?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui agrego mi logica
      console.log("desde la funcion borrar contacto");
      console.log(idContacto);
      //buscar en el array el objeto que tiene este idContacto arrray.findIndex
      const posicionContactoBuscado = agenda.findIndex(
        (itemContacto) => itemContacto.id === idContacto
      );
      console.log(posicionContactoBuscado);
      //borrar el objeto del array usando splice(posicion del objeto, cuantos borro)
      agenda.splice(posicionContactoBuscado, 1);
      //actualizar el localstorage
      guardarEnLocalstorage();
      //borrar una fila de la tabla
      const tablaContactos = document.querySelector("tbody");
      console.log(tablaContactos.children[posicionContactoBuscado]); //objeto.propiedad[posicionarray]
      tablaContactos.removeChild(
        tablaContactos.children[posicionContactoBuscado]
      );
      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto fue eliminado exitosamente",
        icon: "success",
      });
    }
  });
};

window.verDetalleContacto = (idContacto) => {
  console.log(window.location);
  window.location.href =
    window.location.origin + "/pages/detalleContacto.html?id=" + idContacto;
};

//logica extra
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
