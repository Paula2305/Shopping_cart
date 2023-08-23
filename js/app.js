// Variables 
// linea 23
const carrito = document.querySelector('#carrito');

const contendorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// linea 85
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un curso presionando el boton "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso); 
    
    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=> {
        articulosCarrito = [];

        limpiarHTML(); // Eliminamos todo el HTML
    })
};



// Funciones 
// Prueba de que las funciones se realizan correctamente
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        console.log(articulosCarrito);

        carritoHtml(); // Volvemos a iterar sobre el carrito y mostramos el HTML 
    };
};



// Lee el contenido del HTML al que le dimos click y extrae la información del curso

function leerDatosCurso(curso){
    //  console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        // Actualizamos la cantidad 
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son los duplicados 
            }
        });
        articulosCarrito = [...cursos];
    }else{
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    }


    console.log(articulosCarrito);
    carritoHtml();
}

// Muestra el carrito de compras en el HTML

function carritoHtml(){
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML

    articulosCarrito.forEach ( curso => {
        const {imagen, titulo, precio, cantidad,id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td> ${curso.cantidad}</td>

        <td> 
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X
        </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contendorCarrito.appendChild(row);

    });
}


// Elimina los cursos del tbody
function limpiarHTML(){
    // Forma lenta
    // contendorCarrito.innerHTML = '';

    while(contendorCarrito.firstChild){
        contendorCarrito.removeChild(contendorCarrito.firstChild);
    }

}


