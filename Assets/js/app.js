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
    if (timeInput.value != "") {
        alarmas.push(timeInput.value);
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

    var cuadroAlarmas = document.getElementById("#cuadroAlarmas");
    var p = document.createElement("p");
    for (const alarma in alarmas) {
        p.innerHTML = alarma;
        cuadroAlarmas.appendChild(p);
        console.log("Agregue una");
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