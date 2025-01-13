

function saludar() {
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;

    let persona = new Persona(nombre, apellidos);
    let p = document.getElementById("output")

    p.innerText = `Hola ${persona.nombre} ${persona.apellidos}`
}