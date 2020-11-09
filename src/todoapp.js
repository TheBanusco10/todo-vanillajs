
const app = document.querySelector('#app');



let tareas = [];

// Vista

    function mostrarIndex() {
                            
        
        let contenido = '';


        if (tareas.length > 0) {
            
        
            
            contenido += `
            
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Acciones</th>
                    </tr>
                <tbody>

            
            `;
            
            let index = 0;
            
            tareas.forEach(element => {
                
                contenido += `
                
                    <tr class="" id="tarea${index}">
                        <td id="tareaTexto${index}">${element.nombre}</td>
                        <td>
                            <input type="checkbox" data-id-tarea="${index}" id="terminarTarea" name="terminarTarea${index}">
                            <button class="btn btn-danger" data-id-tarea="${index}" id="eliminarTarea">Eliminar</button>
                            <button class="btn btn-warning" data-id-tarea="${index}" id="editarTarea">Editar</button>
                        </td>
                    </tr>
                
                
                `;


                index++;
                
            });
            
            contenido += `

                        </tbody>
                    </thead>
                </table>
            
            `;
            
        }
        
        contenido += `<button class="btn btn-primary" id="addNuevaTarea">Añadir tarea</button>`;
        
        let contenedor = `
        
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <h3>Tus tareas</h3>
                        ${contenido}
                    </div>
                </div>
            </div>
            
            
            `;

        return contenedor;


    }

    function nuevaTarea() {


        let contenido = `

            <div class="row">
                <div class="col-sm-12 text-center">
                    <form>
                        <input type="text" class="form-control" placeholder="Nombre de la tarea" id="inputNuevaTarea">
                        <button class="btn btn-success" id="crearNuevaTarea">Añadir tarea</button>
                    </form>
                </div>
            </div>

        `;

        return contenido;

    }

    function editarTarea(index) {


        let contenido = `

            <div class="row">
                <div class="col-sm-12 text-center">
                    <form>
                        <input type="text" class="form-control" value="${tareas[index].nombre}" id="inputEditarTarea">
                        <button class="btn btn-success" data-id-tarea="${index}" id="confirmarEditarTarea">Editar tarea</button>
                    </form>
                </div>
            </div>

        `;

        return contenido;

    }

// Controlador

    function indexControlador() {

        guardarLocalStorage();

        app.innerHTML = mostrarIndex();
        
        for (let index = 0; index < tareas.length; index++) {
            
            estilosTareaTerminada(index, true);
            
        }
        

    }

    function nuevaTareaControlador() {

        app.innerHTML = nuevaTarea();

    }

    function eliminarTareaControlador(index) {

        tareas.splice(index, 1);

        indexControlador();

    }

    function editarTareaControlador(index) {

        app.innerHTML = editarTarea(index);

    }

    function confirmarEditarTareaControlador(index) {

        let nuevoNombre = document.querySelector('#inputEditarTarea').value;
        tareas[index].nombre = nuevoNombre;

       indexControlador();

    }

    function crearNuevaTareaControlador() {

        let inputNuevaTarea = document.querySelector('#inputNuevaTarea');

        let nuevoNombre = inputNuevaTarea.value;

        let tarea = {

            nombre: nuevoNombre,
            terminada: false

        }

        tareas.push(tarea);


        indexControlador();

    }

    // FUNCIONES

    function tareaTerminada(index) {

        tareas[index].terminada = estilosTareaTerminada(index, false);

        guardarLocalStorage();


    }

    // @param index (integer) index de la tarea
    // @param inicializar (boolean) inicializar a true si se recarga la página
    function estilosTareaTerminada(index, inicilizar) {


        let tr = document.getElementById(`tarea${index}`);

        let checkbox = document.querySelector(`input[name="terminarTarea${index}"]`);

        let activo = false;

        let tareaTexto = document.getElementById(`tareaTexto${index}`);

        
        if (inicilizar) {
            activo = tareas[index].terminada; 
            checkbox.checked = activo ? true : false;
        }else {
            activo = checkbox.checked;
        }

        tr.className = activo ? 'bg-success' : ''; // Aplicamos fondo verde a la fila
        tareaTexto.style.textDecoration = activo ? 'line-through' : ''; // Tachamos el nombre de la actividad
        tareaTexto.style.color = activo ? 'white' : ''; // Cambiamos el color del texto por blanco
        
        return activo;
    }

    function getLocalStorage() {

        let localStorage = window.localStorage;

        tareas = (JSON.parse(localStorage.getItem('tareas')) || []);

    }

    function guardarLocalStorage() {

        let localStorage = window.localStorage;

        localStorage.setItem('tareas', JSON.stringify(tareas));

    }

// Eventos

    document.addEventListener('DOMContentLoaded', () => {

        getLocalStorage();
        indexControlador();

    });

    document.addEventListener('click', evt => {

        let index = evt.target.dataset.idTarea;

        if (evt.target.matches('#addNuevaTarea')) nuevaTareaControlador();
        else if (evt.target.matches('#crearNuevaTarea')) crearNuevaTareaControlador();
        else if (evt.target.matches('#eliminarTarea')) eliminarTareaControlador(index);
        else if (evt.target.matches('#editarTarea')) editarTareaControlador(index);
        else if (evt.target.matches('#confirmarEditarTarea')) confirmarEditarTareaControlador(index);
        else if (evt.target.matches('#terminarTarea')) tareaTerminada(index);



    });


