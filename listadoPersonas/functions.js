function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const yourServerUrl = 'https://joseluisasp.azurewebsites.net/API/personas/';

const departamentos = ["Contabilidad", "Informatica", "Recursos Humanos", "Finanzas"]

function deletePersona(id, nombre) {
    if (!confirm(`Are you sure you want to delete ${nombre}?`))
        return;

    document.getElementById(`persona-${id}`).remove();

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('DELETE', `${yourServerUrl}/${id}`, true);

    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("bye hoe");
        }
    }

    xhr.send();
}

function getData() {
    // Declarar un objeto para hacer peticiones y configurarlo
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', yourServerUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Configurar la funcion que se ejecutará una vez se tengan los datos
    xhr.onload = function () {
        let tableBody = document.getElementById("pokemons");
        let data = xhr.response
        console.log(data)

        data.forEach((p) => {
            // Añadir al cuerpo de la tabla
            tableBody.innerHTML += `
                <tr id="persona-${p.id}">
                    <td>${p.id}</td>
                    <td>${p.nombre} ${p.apellidos}</td>
                    <td><img src="${p.foto}" alt="${p.nombre} ${p.apellidos}"></td>
                    <td>${p.telefono}</td>
                    <td>${p.direccion}</td>
                    <td>${departamentos[p.idDepartamento]}</td>
                    <td>
                        <button onclick="deletePersona(${p.id}, '${p.nombre}')">Borrar</button>
                    </td>
                </tr>
            `;
        })


    };

    // Lanzar la peticion
    xhr.send();
}

window.onload = () => {
    getData();
}