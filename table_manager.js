let item_count = 0;
let totalConsumptionSum = 0;
const devices = [];

function createNewCell(type, elementId) {
    let cell = document.createElement(type);
    cell.id = elementId;
    return cell;
}

function setNewCell(row, element) {
    let cell = document.createElement("th");
    cell.appendChild(element);
    row.appendChild(cell);
}

function createNewInput(row, placeholder, elementId, device, property) {
    let input = createNewCell("input", elementId);
    input.type = "text";
    input.placeholder = placeholder;
    input.addEventListener("input", (event) => {
        let value = event.target.value;
        if (property !== 'name') {
            value = parseFloat(value) || 0; // Convertir a número si no es el nombre
        }
        device[property] = value;
        console.log(`Updated ${property}:`, device[property]); // Verificar el valor actualizado
        device.calculateConsumption();
        updateDeviceRow(device, row);
        updateTotalConsumption();
        updateChart(); // Asegurarse de actualizar el gráfico
    });
    setNewCell(row, input);
}

function addNewItem() {
    let row = document.createElement("tr");
    row.id = `row_${item_count}`;

    const device = new Device();
    devices.push(device);

    createNewInput(row, "Ingrese el nombre del dispositivo", `name_${item_count}`, device, 'name');
    createNewInput(row, "Ingrese el consumo del dispositivo", `consumption_${item_count}`, device, 'timeConsume');
    createNewInput(row, "Ingrese el uso diario del dispositivo", `usage_${item_count}`, device, 'hoursActive');
    createNewInput(row, "Ingrese el consumo pasivo del dispositivo", `passive_consumption_${item_count}`, device, 'passiveConsume');

    let consumption = createNewCell("p", `consumption_${item_count}`);
    let consumptionCost = createNewCell("p", `consumption_cost_${item_count}`);
    let deleteItem = createNewCell("input", `delete_item_${item_count}`);
    deleteItem.type = "button";
    deleteItem.value = "x";
    deleteItem.addEventListener("click", () => deleteRow(row.id, device));

    setNewCell(row, consumption);
    setNewCell(row, consumptionCost);
    setNewCell(row, deleteItem);

    document.getElementById("item_table").appendChild(row);
    item_count++;
    console.log(`Added new device:`, device); // Verificar el nuevo dispositivo
}

function deleteRow(rowId, device) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();
        const index = devices.indexOf(device);
        if (index > -1) {
            devices.splice(index, 1);
        }
        updateTotalConsumption();
    }
}

function updateDeviceRow(device, row) {
    const consumptionCell = row.querySelector(`p[id^='consumption_']`);
    const costCell = row.querySelector(`p[id^='consumption_cost_']`);

    if (consumptionCell && costCell) {
        consumptionCell.textContent = `${device.totalConsume}w/h`;
        costCell.textContent = `$${device.cost}`;
    }
}

function updateTotalConsumption() {
    totalConsumptionSum = 0;
    const limit = 12333;

    devices.forEach(device => {
        device.calculateConsumption();
        totalConsumptionSum += parseFloat(device.totalConsume);
    });

    const totalCostSum = (totalConsumptionSum * light_cost).toFixed(0);
    const text = document.getElementById("consumption");
    text.textContent = `Se detectó un consumo total de ${totalConsumptionSum.toFixed(2)}w/h, con un coste de $${totalCostSum}.`;

    const overCost = totalCostSum - (limit * light_cost).toFixed(0);
    const warning = document.getElementById("warning");
    const message = "Aviso: Se está consumiendo energía por sobre el promedio per cápita nacional, se recomienda disminuir el consumo en alguno de sus artículos u optar por un electrodoméstico de menor consumo.";
    warning.innerHTML = `${message} <u>Se está produciendo un sobregasto de $${overCost}.</u>`;

    text.hidden = totalConsumptionSum === 0;
    warning.hidden = overCost <= 0;
}

document.getElementById("new_item").addEventListener('click', addNewItem);
addNewItem();