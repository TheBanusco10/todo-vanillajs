
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
                            <button class="btn btn-warning" data-id-tarea="${index}">Editar</button>
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
                        <input type="text" class="form-control" placeholder="Nombre de la tarea" id="inputNuevaTarea" autofocused>
                        <button class="btn btn-success" id="crearNuevaTarea">Añadir tarea</button>
                    </form>
                </div>
            </div>

        `;

        return contenido;

    }

// Controlador

    function indexControlador() {

        guardarLocalStorage();

        console.log('TAREAS', tareas);

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

    function tareaTerminada(index) {

        tareas[index].terminada = estilosTareaTerminada(index, false);

        guardarLocalStorage();


    }

    function estilosTareaTerminada(index, inicilizar) {


        let tr = document.getElementById(`tarea${index}`);

        console.log(tr);


        //  TODO
        let activo = document.querySelector(`input[name="terminarTarea${index}"]`).checked; // Recuperar solo el checkbox

        console.log(activo);

        let tareaTexto = document.getElementById(`tareaTexto${index}`);

        
        if (inicilizar) {
            activo = tareas[index].terminada; // Cambiar activo por otra variable para guardar el boolean
            // Activar el checkbox
        }

        tr.className = activo ? 'bg-success' : ''; // Cambiar activo por la otra variable
        tareaTexto.style.textDecoration = activo ? 'line-through' : '';
        tareaTexto.style.color = activo ? 'white' : '';
        
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
        else if (evt.target.matches('#terminarTarea')) tareaTerminada(index);



    });


