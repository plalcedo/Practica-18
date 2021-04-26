const audio = document.getElementById("audio");
const timeInput = document.getElementById("timeInput");
var alarmas = [];

window.onload = () => {
    setInterval(() => {
        var time = new Date();
        var hour = time.getHours();
        var minute = time.getMinutes();

        printHour(hour);
        printMinute(minute);
        printAmPm(hour);
        blinkDots();

        triggerAlarm(hour, minute);
    }, 1000);
}

/* Desplegar el cuadro para añadir una alarma */

document.querySelector("#newAlarm").addEventListener("click", () => {
    if (document.querySelector("#alarmBox").classList.contains("alarmBoxHidden")) {
        document.querySelector("#alarmBox").classList.remove("alarmBoxHidden");
        document.querySelector("#alarmBox").classList.add("alarmBoxDeployed");
    } else if (document.querySelector("#alarmBox").classList.contains("alarmBoxDeployed")) {
        document.querySelector("#alarmBox").classList.remove("alarmBoxDeployed");
        document.querySelector("#alarmBox").classList.add("alarmBoxHidden");
    }
});

/* Ingresar una nueva alarma */

document.querySelector("#setAlarm").addEventListener("click", () => {
    console.log(timeInput.value);
    /* Verificación para que el campo de la alarma no se encuentre vacío */

    if (timeInput.value != "") {
        alarmas.push(timeInput.value);

        /* Creación de elementos y variables */
        var numeroBoton = alarmas.length - 1;
        var div = document.createElement("div");
        var p = document.createElement("p");
        var button = document.createElement("button");

        /* Ajuste de la hora militar a AM o PM */

        var hora = String(timeInput.value).substring(0, 2)
        var minutos = String(timeInput.value).substring(3, 5);

        if (hora >= 10) {
            var newHora = (((Number(hora) + 11) % 12) + 1);
            if (newHora < 10) {
                newHora = "0" + String((((Number(hora) + 11) % 12) + 1));
            }
        } else {
            var newHora = hora;
        }

        if (hora == "00") {
            var newHora = 12;
        }

        if (Number(hora) >= 0 && Number(hora < 12)) {
            var ampm = "a.m.";
        } else {
            var ampm = "p.m.";
        }

        var letreroAlarma = String(newHora) + ":" + String(minutos) + " " + ampm;

        /* Añadir clases y agregarlas a la pantalla */

        div.classList.add("rowAlarma");
        p.innerHTML = letreroAlarma;
        p.classList.add("alarmas");
        button.innerHTML = "X";
        button.classList.add("btnEliminar");
        button.setAttribute("id", numeroBoton);
        div.appendChild(p);
        div.appendChild(button);
        document.querySelector("#alarmas").appendChild(div);

        /* Notificación */
        notificacion();


        /* Eliminar una alarma */

        button.onclick = function() {
            alarmas.splice(numeroBoton);
            document.querySelector("#alarmas").removeChild(div);
        };
    }

    console.log(alarmas);
});

/* Ver alarmas existentes */

document.querySelector("#btnView").addEventListener("click", () => {
    if (document.querySelector("#cuadroAlarmas").classList.contains("d-none")) {
        document.querySelector("#cuadroAlarmas").classList.remove("d-none");
        document.querySelector("#cuadroAlarmas").classList.add("d-flex");
    } else if (document.querySelector("#cuadroAlarmas").classList.contains("d-flex")) {
        document.querySelector("#cuadroAlarmas").classList.remove("d-flex");
        document.querySelector("#cuadroAlarmas").classList.add("d-none");
    }

});



/* Ejecutar la alarma */

function triggerAlarm(hora, minuto) {

    if (hora < 10) {
        hora = "0" + hora;
    }
    if (minuto < 10) {
        minuto = "0" + minuto;
    }

    //console.log(hora);
    //console.log(minuto);

    var currentTime = (hora + ":" + minuto);
    //console.log(currentTime);

    for (var i = 0; i <= alarmas.length; i++) {
        if (currentTime == alarmas[i]) {
            var index = i;
            console.log("DESPIERTA");
            audio.play();
            document.querySelector("#stopAlarm").classList.remove("d-none");
            document.querySelector("#stopAlarm").classList.add("d-flex");
            document.querySelector("#btnStop").addEventListener("click", () => {
                audio.pause();
                stopAlarm(index);
            });
        }
    }
}

/* Detener la alarma */

function stopAlarm(alarma) {
    console.log("Alarma a quitar: " + alarma);
    alarmas.splice(alarma);
    console.log(alarmas);
    document.querySelector("#stopAlarm").classList.remove("d-flex");
    document.querySelector("#stopAlarm").classList.add("d-none");
}

/* Mostrar hora en el reloj */

function printHour(hora) {
    if (hora < 10) {
        document.querySelector("#hora").innerHTML = ("0" + hora);
    } else if (hora >= 10) {
        document.querySelector("#hora").innerHTML = ((hora + 11) % 12 + 1);
    }
}

/* Mostrar minutos en el reloj */

function printMinute(minuto) {
    if (minuto < 10) {
        document.querySelector("#minuto").innerHTML = ("0" + minuto);
    } else if (minuto >= 10) {
        document.querySelector("#minuto").innerHTML = minuto;
    }
}

/* Determinar AM o PM */

function printAmPm(hora) {
    if (hora >= 12) {
        document.querySelector("#am").classList.remove("on");
        document.querySelector("#am").classList.add("off");
        document.querySelector("#pm").classList.remove("off");
        document.querySelector("#pm").classList.add("on");
    } else if (hora < 12) {
        document.querySelector("#am").classList.remove("off");
        document.querySelector("#am").classList.add("on");
        document.querySelector("#pm").classList.remove("on");
        document.querySelector("#pm").classList.add("off");
    }
}

/* Parpadeo de los dos puntos (:) */

function blinkDots() {
    if (document.querySelector(".dots").classList.contains("off")) {
        document.querySelector(".dots").classList.remove("off");
        document.querySelector(".dots").classList.add("on");
    } else if (document.querySelector(".dots").classList.contains("on")) {
        document.querySelector(".dots").classList.remove("on");
        document.querySelector(".dots").classList.add("off");
    }
}

function deleteAlarm(index) {
    alarmas.splice(index);

}

function notificacion() {
    setTimeout(function() {
        document.querySelector("#notificacion").classList.remove("d-none");
        document.querySelector("#notificacion").classList.add("d-flex");
    }, 300);
    setTimeout(function() {
        document.querySelector("#notificacion").classList.remove("d-flex");
        document.querySelector("#notificacion").classList.add("d-none");
    }, 2000);
}