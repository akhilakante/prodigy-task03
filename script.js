const form = document.getElementById("predictionForm");
const resultElement = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    predict();
});

function setResult(message, tone) {
    resultElement.textContent = message;
    resultElement.classList.remove("success", "warning", "danger");
    resultElement.classList.add(tone);
}

function getNumericFieldValue(fieldId, label, minValue, maxValue) {
    const rawValue = document.getElementById(fieldId).value.trim();

    if (rawValue === "") {
        throw new Error(`${label} is required.`);
    }

    const value = Number(rawValue);

    if (!Number.isFinite(value)) {
        throw new Error(`${label} must be a valid number.`);
    }

    if (value < minValue || value > maxValue) {
        throw new Error(`${label} must be between ${minValue} and ${maxValue}.`);
    }

    return value;
}

function predict() {
    try {
        const age = getNumericFieldValue("age", "Age", 1, 120);
        const balance = getNumericFieldValue("balance", "Balance", 0, 1000000000);
        const previous = getNumericFieldValue("previous", "Previous contacts", 0, 1000000);
        const job = document.getElementById("job").value;

        let result = "";
        let tone = "warning";

        if (age > 30) {
            if (balance > 5000) {
                result = "Customer WILL purchase (High probability).";
                tone = "success";
            } else if (previous > 2) {
                result = "Customer MAY purchase.";
                tone = "warning";
            } else {
                result = "Customer will NOT purchase.";
                tone = "danger";
            }
        } else if (job === "student") {
            result = "Customer MAY purchase.";
            tone = "warning";
        } else {
            result = "Customer will NOT purchase.";
            tone = "danger";
        }

        setResult(result, tone);
    } catch (error) {
        setResult(error.message, "danger");
    }
}