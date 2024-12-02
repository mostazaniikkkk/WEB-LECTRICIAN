document.getElementById("export_as_pdf").addEventListener("click", generatePDF);

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Informe de Consumo Eléctrico", 10, 10);

    // Crear un array para almacenar los datos de la tabla
    const tableData = devices.map(device => [
        device.name,
        device.timeConsume,
        device.hoursActive,
        device.passiveConsume,
        `${device.totalConsume}w/h`,
        `$${device.cost}`
    ]);

    // Definir los encabezados
    const headers = [['Nombre electrodoméstico', 'Consumo energético (w/h)', 'Horas activo', 'Consumo pasivo', 'Consumo total (w/h)', 'Coste de luz (CLP)']];

    // Agregar la tabla al PDF
    doc.autoTable({
        head: headers,
        body: tableData
    });

    // Capturar el contenido del canvas y agregarlo al PDF con tamaño ajustado
    html2canvas(document.querySelector('#consumptionChart')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 180; // Ajustar el ancho de la imagen
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener la proporción de la imagen
        doc.addImage(imgData, 'PNG', 10, doc.autoTable.previous.finalY + 10, imgWidth, imgHeight);
        doc.save("informe_consumo.pdf");
    });
}