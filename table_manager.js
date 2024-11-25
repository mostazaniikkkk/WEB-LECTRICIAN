let item_count = 0; // Asegúrate de declarar item_count
let totalConsumptionSum = 0; // Variable para almacenar la suma total

function addNewItem() {
    let row = document.createElement("tr");
    row.id = `row_${item_count}`;

    function _createNewCell(type, element) {
        let cell = document.createElement(type);
        cell.id = `${element}_${item_count}`;
        return cell;
    }

    function _setNewCell(element) { 
        let cell = document.createElement("th");
        cell.appendChild(element);
        row.appendChild(cell);
        return cell;
    }

    function _createNewInput(placeholder, element) {
        let cell = _createNewCell("input", element);
        cell.type = "text";
        cell.placeholder = placeholder;
        cell.addEventListener("input", updateTotalConsumption);
        _setNewCell(cell);
    }

    // Crea los elementos que están en los requerimientos.
    _createNewInput("Ingrese el nombre del dispositivo", "name");
    _createNewInput("Ingrese el consumo del dispositivo", "consumption");
    _createNewInput("Ingrese el uso diario del dispositivo", "usage");
    _createNewInput("Ingrese el consumo pasivo del dispositivo", "passive_consumption");

    // Gestiona los 2 elementos diferentes
    const light_cost = 170;

    const consumption = _createNewCell("p", "consumption");
    const consumption_cost = _createNewCell("p", "consumption_cost")
    let delete_item = _createNewCell("input", "delete_item");
    delete_item.type = "button";
    delete_item.value = "x";
    delete_item.addEventListener("click", function() {
        deleteRow(row.id);
    });

    _setNewCell(consumption);
    _setNewCell(consumption_cost);
    _setNewCell(delete_item);

    // Aplica los cambios
    const table = document.getElementById("item_table");
    table.appendChild(row);

    item_count++;
}

function deleteRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();
        updateTotalConsumption(); // Actualiza el total después de eliminar una fila
    }
}

function getTotalConsuption(consuption, usage, pasive_consuption = 0) { return consuption * usage + pasive_consuption; }

function updateTotalConsumption() {
    totalConsumptionSum = 0; // Reinicia la suma total
    const light_cost = 0.17; //Coste Luz en pesos chilenos, actualizable
    const limit = 12333;//Consumo promedio de luz por persona, actualizable

    const rows = document.querySelectorAll("tr");
    rows.forEach(row => {

        const consumptionInput = row.querySelector("input[id^='consumption_']");
        const usageInput = row.querySelector("input[id^='usage_']");
        const passiveConsumptionInput = row.querySelector("input[id^='passive_consumption_']");
        const totalConsumptionCell = row.querySelector("p[id^='consumption_']");
        const totalCostCell = row.querySelector("p[id^='consumption_cost_']");

        if (consumptionInput && usageInput && totalConsumptionCell) {
            const consumption = parseFloat(consumptionInput.value) || 0;
            const usage = parseFloat(usageInput.value) || 0;
            const passiveConsumption = passiveConsumptionInput ? parseFloat(passiveConsumptionInput.value) || 0 : 0;

            if (!isNaN(consumption) && !isNaN(usage)) {
                const totalConsumption = getTotalConsuption(consumption, usage, passiveConsumption);
                totalConsumptionCell.textContent = `${totalConsumption.toFixed(1)}w/h`;

                totalCostCell.textContent = `$${(totalConsumption.toFixed(2) * light_cost).toFixed(0)}`;
                totalConsumptionSum += totalConsumption; // Suma el consumo total de cada fila
                totalCostSum = (totalConsumptionSum * light_cost).toFixed(0);
            }
        }
    });
    text = document.getElementById("consumption")
    text.textContent = `Se detectó un consumo total de ${totalConsumptionSum.toFixed(2)}w/h, con un coste de $${totalCostSum}.`;
    const overCost = (totalCostSum) - ((limit * light_cost).toFixed(0));

    if(totalConsumptionSum != 0) {text.hidden = false;}
    else{text.hidden = true;}

    warning = document.getElementById("warning");
    message = "Aviso: Se esta consumiendo energia por sobre el promedio per capita nacional, se recomienda disminuir el consumo en alguno de sus articulos u optar por un electrodomestico de menor consumo.";
    warning.innerHTML = `${message} <u>Se esta produciendo un sobregasto de $${overCost}.</u>`;

    if(overCost <= 0){ warning.hidden = true; }
    else{warning.hidden = false;}

    console.log(totalConsumptionSum);
    console.log(limit);
}

addNewItem();
document.getElementById("new_item").addEventListener('click', addNewItem);