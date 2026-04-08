async function getPlan() {
    const age = parseInt(document.getElementById("age").value);
    const conditions = document.getElementById("conditions").value.split(",");
    const medications = document.getElementById("medications").value.split(",");
    const genetic = parseFloat(document.getElementById("genetic").value);

    const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            age: age,
            conditions: conditions,
            medications: medications,
            genetic_risk: genetic
        })
    });

    const data = await response.json();

    // Treatments
    const treatmentsEl = document.getElementById("treatments");
    treatmentsEl.innerHTML = "";
    data.recommended_treatments.forEach(t => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = t;
        treatmentsEl.appendChild(li);
    });

    // Warnings
    const warningsEl = document.getElementById("warnings");
    warningsEl.innerHTML = "";
    data.interaction_warnings.forEach(w => {
        const li = document.createElement("li");
        li.className = "list-group-item warning";
        li.textContent = w;
        warningsEl.appendChild(li);
    });

    // Risk Chart
    const ctx = document.getElementById("riskChart").getContext("2d");
    if (window.riskChart) window.riskChart.destroy(); // Reset previous chart
    window.riskChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Risk Score'],
            datasets: [{
                label: 'Risk (0-1)',
                data: [data.risk_score],
                backgroundColor: ['rgba(255, 99, 132, 0.7)']
            }]
        },
        options: {
            indexAxis: 'y',
            scales: { x: { min: 0, max: 1 } },
            plugins: { legend: { display: false } }
        }
    });

    document.getElementById("explanation").innerText = data.explanation;
}
await newFunction();

async function newFunction() {
        { const response = await fetch("http://127.0.0.1:8000/recommend", {}); }
    }
