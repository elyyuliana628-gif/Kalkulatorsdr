
const display = document.getElementById("display");

function append(value) {
    if (display.value === "Error") {
        display.value = "0";
    }

    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteNumber() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, "/100");

        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error("Input tidak valid");
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Perhitungan tidak valid");
        }

        display.value = String(
            Number(result.toPrecision(12))
        );

    } catch (error) {
        display.value = "Error";
    }
}
