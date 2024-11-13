// Función para generar un ID único usando UUID
const generarId = () => crypto.randomUUID();

// Evento al hacer clic en el botón de "Agregar Proyecto"
$("#add").click(function(){  
    // Generar un nuevo ID para el proyecto
    let id = generarId();
    // Obtener el valor del input de proyecto
    let nombreProyecto = $("#proyecto").val();

    // Verificar si el nombre del proyecto está vacío
    if (nombreProyecto === "") {
        alert("Por favor, ingresa un nombre para el proyecto."); // Mostrar alerta si el campo está vacío
        return; // Salir de la función si no hay nombre
    }

    // Crear un nuevo elemento de proyecto con un ID único
    const nuevoProyecto = `
        <li data-id="${id}" class="proyecto">
            <p class="nombreProyecto" data-id="${id}">${nombreProyecto}</p>
            <div>
                <!-- Input para agregar nueva tarea -->
                <input id="input-${id}" placeholder="Nueva Tarea">
                <!-- Botón para añadir tarea con el mismo ID del proyecto -->
                <button class="addTarea" data-id="${id}">Añadir Tarea</button>
                <!-- Botón para eliminar el proyecto -->
                <button class="borrarProyecto" data-id="${id}">Eliminar Proyecto</button>
            </div>
            <!-- Lista donde se añadirán las tareas del proyecto -->
            <ul class="listaTareas" id="tareas-${id}"></ul>
        </li>
    `;
    // Agregar el nuevo proyecto a la lista en el DOM
    $("#lista").append(nuevoProyecto);
    // Limpiar el input del nombre del proyecto
    $("#proyecto").val("");
});

// Delegación de eventos para el botón "Añadir Tarea"
$("body").on("click", ".addTarea", function() {
    // Generar un nuevo ID para la tarea
    let id = generarId();
    // Obtener el ID del proyecto al que se está añadiendo la tarea
    let tareaid = $(this).data("id");
    // Seleccionar el input de la tarea correspondiente al proyecto
    let tareaInput = $(`#input-${tareaid}`);
    // Obtener el nombre de la tarea del input
    let nombreTarea = tareaInput.val();

    // Verificar si el nombre de la tarea está vacío
    if (nombreTarea === "") {
        alert("Por favor, ingresa una tarea."); // Mostrar alerta si el campo está vacío
        return; // Salir de la función si no hay nombre
    }

    // Crear un nuevo elemento de tarea con un ID único
    const nuevaTarea = `
        <li data-id="${id}" class = "Tarea">
            <div>
                <p> ${nombreTarea} </p>
                <!-- Botones para completar, marcar importante o eliminar la tarea -->
                <button class="CompletarTarea" data-id="${id}">Marcar Completada</button>
                <button class="ImportanteTarea" data-id="${id}">Marcar Importante</button>
                <button class="borrarTarea" data-id="${id}">Eliminar</button>
            </div>
        </li>
    `;
    // Agregar la nueva tarea a la lista de tareas del proyecto correspondiente
    $(`#tareas-${tareaid}`).append(nuevaTarea);
});

// Delegación de eventos para el botón "Eliminar Proyecto"
$("body").on("click", ".borrarProyecto", function(){
    // Obtener el ID del proyecto a eliminar
    const proyectoId = $(this).data("id");
    // Eliminar el proyecto del DOM utilizando el atributo data-id
    $(`li[data-id="${proyectoId}"]`).remove();
});

//borrar tarea
$("body").on("click",".borrarTarea",function(){
    // Obtener el ID de la tarea a eliminar
    const tareaId = $(this).data("id");
    // Eliminar la tarea del DOM utilizando el atributo data-id
    $(`li[data-id="${tareaId}"]`).remove();
});

// funcion para cambiar el p con doble clik a un input
$("body").on("dblclick",".nombreProyecto",function(){
    // Generar un nuevo ID para el nombre del proyecto
    let id = generarId();
    // Obtener el ID del nombre del proyecto para modificarlo
    const proyectoId = $(this).data("id"); 
    // Obtener el objeto del DOM
    let p = $(`p[data-id="${proyectoId}"]`);
    // Obtener el nuevo nombre del proyecto del input
    let nombre = p.text();
    //Reemplaza la etiqueta p por un input para el nombre del proyecto 
    p.replaceWith(`<input data-id="${id}" class="nuevoNombre" placeholder="${nombre}">`);   
});

//Funcion que se activa cuando se preciona el teclado
$("body").on("keydown", ".nuevoNombre", function(event) {
    // Verificar si la tecla presionada es Enter (código 13)
    if (event.key === "Enter") {
        // Obtener el ID del proyecto para modificarlo
        const proyectoId = $(this).data("id");  
        // Obtener el objeto del DOM
        let input = $(`input[data-id="${proyectoId}"]`);
        // Obtener el nuevo nombre del proyecto del input
        let nombre = input.val();

        // Validar si el nombre está vacío
        if (nombre === "") {
            alert("Por favor, ingresa un nombre para el proyecto.");
            return;
        }

        // Reemplazar el input con un párrafo <p> que tenga el nuevo nombre
        input.replaceWith(`<p class="nombreProyecto nuevoNombre" data-id="${proyectoId}">${nombre}</p>`);
    }
});

// agrega clase cuando el mouse entra a la tarea
$("body").on("mouseenter", ".Tarea", function(){
    // recupera el id de la tarea
    const tareaId = $(this).data("id");
    // asigna a la bariable el objeto del DOM
    let tarea = $(`li[data-id="${tareaId}"]`);
    // asigna una clase al objeto del DOM
    tarea.addClass("hovered");
});

// quita la clase cuando el mouse sale de la tarea
$("body").on("mouseleave", ".Tarea", function(){
    // recupera el id de la tarea
    const tareaId = $(this).data("id");
    // asigna a la bariable el objeto del DOM
    let tarea = $(`li[data-id="${tareaId}"]`);
    // remueve la clase del objeto DOM
    tarea.removeClass("hovered");
});

// marca la tarea como importante
$("body").on("click",".ImportanteTarea",function(){
    // recupera el id de la tarea
    const tareaId = $(this).data("id");
    // asigna a la bariable el objeto del DOM
    let tarea = $(`li[data-id="${tareaId}"]`);
    // asigna una clase al objeto del DOM
    tarea.addClass("importante");
});

// marcar la tarea como terminada
$("body").on("click",".CompletarTarea",function(){
    // recupera el id de la tarea
    const tareaId = $(this).data("id");
    // asigna a la bariable el objeto del DOM
    let tarea = $(`li[data-id="${tareaId}"]`);
    // remueve la clase del objeto DOM
    tarea.removeClass("importante");
    // asigna una clase al objeto del DOM
    tarea.addClass("completada");
});

