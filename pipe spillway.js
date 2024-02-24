// Constants
const g = 9.81;
const Pi = 3.14;

// Function to calculate Pipe Spillway
function calculatePipeSpillway(event) {
    event.preventDefault(); // Prevent form submission
    
    // Gather inputs from form fields
    var c = parseFloat(document.getElementById("c").value);
    var i = parseFloat(document.getElementById("i").value);
    var A = parseFloat(document.getElementById("A").value);
    var h = parseFloat(document.getElementById("h").value);
    var Ke = parseFloat(document.getElementById("Ke").value);
    var Kc = parseFloat(document.getElementById("Kc").value);
    var l = parseFloat(document.getElementById("l").value);

    // Calculate peak discharge (Qp) and 50% of peak flow (Q)
    var Qp = (c * i * A) / 36;
    var Q = 0.5 * Qp;

    // Calculate diameter of pipe (d)
    var X1 = 2 * g * h;
    var X2 = Math.sqrt(X1);
    var X3 = 1 + Ke + Kc * l;
    var X4 = Math.sqrt(X3);
    var X5 = Q * X4 * 4 / (Pi * X2);
    var d = Math.sqrt(X5);

    // Calculate velocity of flow (V)
    var V = Q * 4 / (Pi * d * d);

    // Calculate natural slope (Sn)
    var X6 = Kc * V * V / (2 * g);
    var X7 = 1 - (X6 * X6);
    var Sn = X6 / Math.sqrt(X7);

    // Calculate conduit slope (S)
    var dH = 0.3;
    var S = dH / l;

    // Determine flow condition
    var flowCondition = (S < Sn) ? "Full flow condition" : "Partial flow condition";

    // Display results in HTML
    document.getElementById("Q").innerText = Q.toFixed(2);
    document.getElementById("d").innerText = d.toFixed(2);
    document.getElementById("V").innerText = V.toFixed(2);
    document.getElementById("Sn").innerText = Sn.toFixed(2);
    document.getElementById("S").innerText = S.toFixed(2);
    document.getElementById("flowCondition").innerText = flowCondition;

    // Show results
    document.getElementById("result").style.display = "block";
}

// Attach event listener to form submission
document.getElementById("spillwayForm").addEventListener("submit", calculatePipeSpillway);
