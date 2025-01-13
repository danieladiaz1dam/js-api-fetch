function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const yourServerUrl = 'https://beta.pokeapi.co/graphql/v1beta'

function getQuery(regex = "") {
    const query = {
        query: `{
            pokemon_v2_pokemon(limit: 151, where: {name: {_regex: "${regex}"}, id: {_lt: 152}}) {
            id
            name
            pokemon_v2_pokemonsprites {
              sprites(path: "front_default")
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    name
                }
            }
          }
      }`
    };

    return query;
}

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};

function getData() {
    // Obtener valor de la barra de busqueda
    let search = document.getElementById("search").value;

    // Declarar un objeto para hacer peticiones y configurarlo
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', yourServerUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Configurar la funcion que se ejecutará una vez se tengan los datos
    xhr.onload = function () {
        let data = xhr.response["data"]["pokemon_v2_pokemon"]
        let tableBody = document.getElementById("pokemons");

        data.forEach((pkm) => {
            // Para cada tipo retornar un span y separarlos por un espacio
            const types = pkm.pokemon_v2_pokemontypes.map(type => {
                const typeName = type.pokemon_v2_type.name;
                const color = typeColors[typeName] || "#777"; // Default to gray if type not found

                return `<span class="type" style="background-color: ${color};">${typeName}</span>`;
            }).join(' ');

            // Añadir al cuerpo de la tabla
            tableBody.innerHTML += `
                <tr>
                    <td>${pkm.id}</td>
                    <td>${pkm.name}</td>
                    <td><img src="${pkm.pokemon_v2_pokemonsprites[0]?.sprites}" alt="${pkm.name}"></td>
                    <td>${types}</td>
                </tr>
            `;
        })


    };

    // Lanzar la peticion
    xhr.send(JSON.stringify(getQuery(search)));
}

function search() {
    document.getElementById("pokemons").innerHTML = "";
    getData();
}

window.onload = () => {
    getData();
    sleep(1000).then(() => {
        document.getElementById("snorlax-div").style.visibility = 'hidden'
    })
}