function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const yourServerUrl = 'https://api.ladaniwapa.es/people/';

const departamentos = ["Contabilidad", "Informatica", "Recursos Humanos"]

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
        console.log("Sent")
        let tableBody = document.getElementById("pokemons");
        let data = xhr.response

        data.forEach((p) => {
            // Añadir al cuerpo de la tabla
            tableBody.innerHTML += `
                <tr id="persona-${p.id}">
                    <td>${p.ID}</td>
                    <td>${p.Nombre} ${p.Apellidos}</td>
                    <td><img src="${p.Foto}" alt="${p.Nombre} ${p.Apellidos}"></td>
                    <td>${p.Telefono}</td>
                    <td>${p.Direccion}</td>
                    <td>${p.Departamento}</td>
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