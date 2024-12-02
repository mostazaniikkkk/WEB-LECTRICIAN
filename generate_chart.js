let chart;

document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('consumptionChart').getContext('2d');

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Consumo Total (w/h)',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    updateChart();

    // Crear un MutationObserver para detectar cambios en la tabla
    const table = document.getElementById('item_table');
    const observer = new MutationObserver(updateChart);

    // Configurar el observer para observar cambios en los hijos de la tabla
    observer.observe(table, { childList: true, subtree: true });
});

function updateChart() {
    // Asegúrate de calcular el consumo de cada dispositivo antes de actualizar el gráfico
    devices.forEach(device => console.log(device.name));
    devices.forEach(device => device.calculateConsumption());

    const deviceNames = devices.map(device => String(device.name)); // Asegúrate de que los nombres sean cadenas de texto
    const totalConsumptions = devices.map(device => parseFloat(device.totalConsume));

    chart.data.labels = deviceNames;
    chart.data.datasets[0].data = totalConsumptions;
    chart.update();
}