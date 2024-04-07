
document.getElementById('login').addEventListener('submit', function (event) {

    event.preventDefault();
    var nombres = document.getElementById('nombres').value;
    if (nombres !== "") {
        localStorage.setItem('usuario', nombres);
        window.location.href = "inicio.html";
    } else {

    }

})