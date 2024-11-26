document.getElementById("export_as_pdf").addEventListener("click", generatePDF);

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Informe de Consumo Eléctrico", 10, 10);

    // Crear un array para almacenar los datos de la tabla
    const tableData = [];
    const rows = document.querySelectorAll('#consume_table tbody tr');

    rows.forEach(row => {
        const rowData = [];
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            rowData.push(input.value);
        });
        const totalConsumption = row.querySelector("p[id^='consumption_']").textContent;
        const totalCost = row.querySelector("p[id^='consumption_cost_']").textContent;
        rowData.push(totalConsumption, totalCost);
        tableData.push(rowData);
    });

    // Definir los encabezados
    const headers = [['Nombre electrodoméstico', 'Consumo energético (w/h)', 'Horas activo', 'Consumo pasivo', 'Consumo total (w/h)', 'Coste de luz (CLP)']];

    // Agregar la tabla al PDF
    doc.autoTable({
        head: headers,
        body: tableData
    });

    // Incluir la advertencia si está visible
    const warningElement = document.getElementById("warning");
    if (!warningElement.hidden) {
        doc.addPage();
        doc.setFontSize(12);
        doc.setTextColor(255, 0, 0); // Color rojo para la advertencia
        doc.text(warningElement.innerText, 10, 10);
    }

    doc.save("informe_consumo.pdf");
}
