const audio = document.getElementById("audio");
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
    }, 1000);
}

document.querySelector("#newAlarm").addEventListener("click", () => {
    const alarmBox = document.getElementById("#alarmBox");
    if (alarmBox.style.display === "none") {
        alarmBox.style.display = "flex";
    } else {
        alarmBox.style.display = "none";
    }
});

function printHour(hora) {
    if (hora < 10) {
        document.querySelector("#hora").innerHTML = ("0" + hora);
    } else if (hora > 10) {
        document.querySelector("#hora").innerHTML = ((hora + 11) % 12 + 1);
    }
}

function printMinute(minuto) {
    if (minuto < 10) {
        document.querySelector("#minuto").innerHTML = ("0" + minuto);
    } else if (minuto >= 10) {
        document.querySelector("#minuto").innerHTML = minuto;
    }
}

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

function blinkDots() {
    if (document.querySelector(".dots").classList.contains("off")) {
        document.querySelector(".dots").classList.remove("off");
        document.querySelector(".dots").classList.add("on");
    } else if (document.querySelector(".dots").classList.contains("on")) {
        document.querySelector(".dots").classList.remove("on");
        document.querySelector(".dots").classList.add("off");
    }
}