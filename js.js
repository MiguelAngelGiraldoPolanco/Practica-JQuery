const generarId = () => crypto.randomUUID();

$("#add").click(function(){  
    let id = generarId();
    let nombreProyecto = $("#proyecto").val();

    if (nombreProyecto === "") {
        alert("Por favor, ingresa un nombre para el proyecto.");
        return;
    }

    const nuevoProyecto = `
        <li data-id="${id}">
            ${nombreProyecto}
            <div>
                <input id="input-${id}" placeholder="Nueva Tarea">
                <button class="addTarea" data-id="${id}">Añadir Tarea</button>
                <button class="borrarProyecto" data-id="${id}">Eliminar Proyecto</button>
            </div>
            <ul class="listaTareas" id="tareas-${id}"></ul>
        </li>
    `;
    $("#lista").append(nuevoProyecto);
    $("#proyecto").val("");
});

$("body").on("click", ".addTarea", function() {
    let id = generarId();
    let tareaid = $(this).data("id");
    let tareaInput =$(`#input-${tareaid}`);
    let nombreTarea = tareaInput.val();

    if (nombreTarea === "") {
        alert("Por favor, ingresa una tarea.");
        return;
    }
    const nuevaTarea = `
        <li data-id="${id}">
            ${nombreTarea}
            <div>
                <button class="CompletarTarea" data-id="${id}">Marcar Completada</button>
                <button class="ImportanteTarea" data-id="${id}">Marcar Importate</button>
                <button class="borrarTarea" data-id="${id}">Eliminar</button>
            </div>
        </li>
    `;
    $(`#tareas-${tareaid}`).append(nuevaTarea);
});

$("body").on("click", ".borrarProyecto", function(){
    const proyectoId = $(this).data("id");
    $(`li[data-id="${proyectoId}"]`).remove();
});