function addzero(n) {
    if (n < 10)
        return `0${n}`
    else
        return `${n}`
}

function numberToSrc(n) {
    if (n < 0)
        return  "imgs/dosPuntos.gif"
    else
        return `imgs/${n}.gif`
}


window.onload = () => {
    let hora = document.getElementById("horaTexto");
    let reloj = document.getElementById("reloj");

    setInterval(() => {
        const d = new Date();
        let arr = [
            addzero(d.getHours())[0],
            addzero(d.getHours())[1],
            -1,
            addzero(d.getMinutes())[0],
            addzero(d.getMinutes())[1],
            -1,
            addzero(d.getSeconds())[0],
            addzero(d.getSeconds())[1]
        ];

        let html = "";

        arr.forEach(n => {
            html += `<img src="${numberToSrc(n)}">`
        })

        reloj.innerHTML = html;

        hora.innerText = `${addzero(d.getHours())}:${addzero(d.getMinutes())}:${addzero(d.getSeconds())}`;
    }, 1000)
}