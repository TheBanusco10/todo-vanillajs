
const app = document.querySelector('#app');
let contenedor = '<div class="container"></div>'

let tareas = [];

// Vista

    function mostrarIndex() {
                            
        let contenido = '<h3>Tus tareas</h3>';

        
        if (tareas.length > 0) {
            
            
            contenido += `
            
            <ul>
            `;
            
            
            tareas.forEach(element => {
                
                contenido += `
                
                <li>${tareas.nombre}</li>
                
                `;
                
            });
            
            contenido += '</ul>';
            
        }
        
        contenido += `<button class="btn btn-primary" id="addNuevaTarea">Añadir tarea</button>`;
        
        contenedor += `
                
                <div class="row">
                    <div class="col-sm-12 text-center">
                        ${contenido}
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
                        <input type="text" class="form-control" placeholder="Nombre de la tarea">
                        <button class="btn btn-success">Añadir tarea</button>
                    </form>
                </div>
            </div>

        `;

        return contenedor = `
            ${contenido}
        `;

    }

// Controlador

    function indexControlador() {

        app.innerHTML = mostrarIndex();

    }

    function nuevaTareaControlador() {

        app.innerHTML = nuevaTarea();

    }


// Eventos

    document.addEventListener('DOMContentLoaded', () => {


        indexControlador();

    });

    document.addEventListener('click', evt => {


        if (evt.target.matches('#addNuevaTarea')) nuevaTareaControlador();


    });


