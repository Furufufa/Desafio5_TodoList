let tareas = [
    { id: 11, descripcion: "Entrenar basquetbol", completado: false },
    { id: 12, descripcion: "Estudiar para el diplomado", completado: false },
    { id: 23, descripcion: "Pintar la pieza", completado: true }
];

document.addEventListener("DOMContentLoaded", function() {
    const formAgregarTarea = document.querySelector("#lista");
    const inputAgregarTarea = document.querySelector("#agregaTarea");
    const listaTareas = document.querySelector("#listaTareas");
    const totalElemento = document.querySelector("#total");
    const realizadasElemento = document.querySelector("#realizadas");

    formAgregarTarea.addEventListener("submit", function(event) {
        event.preventDefault();
        agregarTarea(inputAgregarTarea.value);
        inputAgregarTarea.value = ""; 
    });

    function agregarTarea(descripcion) {
        if (descripcion.trim() !== "") {
            const nuevaTarea = {
                id: obtenerNuevoId(),
                descripcion: descripcion,
                completado: false
            };
            tareas.push(nuevaTarea);
            renderizarTareas();
        }
    }

    function obtenerNuevoId() {
        return tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;
    }

    function renderizarTareas() {
        listaTareas.innerHTML = ""; 
    
        
        
        tareas.forEach(tarea => {
            const tareaElemento = document.createElement("div");
            tareaElemento.classList.add("tarea");
            tareaElemento.innerHTML = `
            <span>${tarea.id}</span>
            <span>${tarea.descripcion}</span>
            <input type="checkbox" name="${tarea.id}" id="allow_status_${tarea.id}" onchange="marcarTarea(${tarea.id})" ${tarea.completado ? 'checked' : ''}>
            <button class="btnBorrar" id="text_${tarea.id}" onclick="eliminarTarea(${tarea.id})">X</button>
            `;
            listaTareas.appendChild(tareaElemento);
        });
        
        actualizarContadores();
    }
    
    function actualizarContadores() {
        const totalTareas = tareas.length;
        const totalTareasRealizadas = tareas.filter(tarea => tarea.completado).length;
        totalElemento.textContent = totalTareas;
        realizadasElemento.textContent = totalTareasRealizadas;
    }
    
    
    function marcarTarea(id) {
        const tarea = tareas.find(tarea => tarea.id === id);
        if (tarea) {
            tarea.completado = !tarea.completado;
            renderizarTareas();
        }
    }
    
    function eliminarTarea(id) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        renderizarTareas();
    }


    renderizarTareas(); 
});
