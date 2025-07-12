const totalInput = document.getElementById("total-scu");
const suffix = document.getElementById("scu-suffix");
const boxSizeSelect = document.getElementById("box-size");
const outputBody = document.getElementById("output-body");


// Ability to hide option based on choice
document.addEventListener('DOMContentLoaded', () => {
  const vehicleGroup = document.getElementById('vehicle-group');
  const manualGroup = document.getElementById('manual-group');
  const totalSCUInput = document.getElementById('total-scu');
  const vehicleInput = document.getElementById('id_vehicle');
  const vehicleMaxSCU = document.getElementById('vehicle-scu-display');

  const radioButtons = document.querySelectorAll('input[name="calculator_option"]');

  function toggleInputGroups() {
    const selected = document.querySelector('input[name="calculator_option"]:checked')?.value;

    if (selected === 'ship_name_automatic') {
      vehicleGroup.style.display = 'block';
      manualGroup.style.display = 'none';
      vehicleInput.value = '';
      totalSCUInput.value = '';
      vehicleMaxSCU.value = '';
    } else if (selected === 'manual_scu') {
      manualGroup.style.display = 'block';
      vehicleGroup.style.display = 'none';
      vehicleInput.value = '';
      totalSCUInput.value = '';
      vehicleMaxSCU.value = '';
    } else {
      vehicleGroup.style.display = 'none';
      manualGroup.style.display = 'none';
      vehicleInput.value = '';
      totalSCUInput.value = '';
      vehicleMaxSCU.value = '';
    }
  }

  radioButtons.forEach(rb => rb.addEventListener('change', toggleInputGroups));

  // On load, hide both if nothing is selected
  toggleInputGroups();
});


// Hide suffix when typing
totalInput.addEventListener("focus", () => {
  suffix.textContent = "";
});

// Show suffix on blur
totalInput.addEventListener("blur", () => {
  if (totalInput.value.trim()) {
    suffix.textContent = "scu";
  }
});

//clear box on double-click
function input_clear(input) {
  input.value = '';
  const vehicleMaxSCU = document.getElementById('vehicle-scu-display');
  vehicleMaxSCU.innerHTML = '';
}

// Automatically input scu of vehicles
document.addEventListener('DOMContentLoaded', () => {
  const vehicleInput = document.getElementById('id_vehicle');
  const scuInput = document.getElementById('total-scu');
  const dataList = document.getElementById('list_vehicles');
  const shipOption = document.getElementById('ship_name_automatic');
  const vehicleMaxSCU = document.getElementById('vehicle-scu-display');
  

  vehicleInput.addEventListener('change', () => {
    const inputValue = vehicleInput.value;
    const options = dataList.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === inputValue) {
        if (shipOption.checked) {
          const scu = options[i].dataset.value;
          scuInput.value = scu;
          vehicleMaxSCU.innerHTML = `Has an scu total of ${scu} scu`;
        }
        break;
      }
    }
  });
});



// Recalculate when input or dropdown changes
function calculateAndDisplay() {
      const mode = document.querySelector('input[name="calculator_option"]:checked');
      const totalScuInput = document.getElementById('total-scu');
      const vehicleInput = document.getElementById('id_vehicle');
      let totalScu = 0;

      if (!mode) return;

      if (mode.value === 'manual_scu') {
        totalScu = parseInt(totalScuInput.value, 10) || 0;
      } else if (mode.value === 'ship_name_automatic') {
        const selectedOption = [...document.getElementById('list_vehicles').options]
          .find(option => option.value.toLowerCase() === vehicleInput.value.toLowerCase());
        if (selectedOption) {
          totalScu = parseInt(selectedOption.dataset.value, 10) || 0;
        }
      }

      const maxBoxSize = parseInt(document.getElementById('box-size').value, 10);
      const outputBody = document.getElementById('output-body');
      outputBody.innerHTML = '';

      if (totalScu > 0) {
        const sizes = [32, 16, 8, 4, 2, 1].filter(size => size <= maxBoxSize);
        for (const size of sizes) {
          const count = Math.floor(totalScu / size);
          if (count > 0) {
            totalScu -= count * size;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${size} scu</td><td>${count}</td>`;
            outputBody.appendChild(row);
          }
        }
      }
    }

    function updateVisibility() {
      const mode = document.querySelector('input[name="calculator_option"]:checked');
      const vehicleInput = document.getElementById('id_vehicle');
      const totalScuInput = document.getElementById('total-scu');
      

      if (!mode) {
        vehicleInput.style.display = 'none';
        totalScuInput.style.display = 'none';
        return;
      }

      if (mode.value === 'manual_scu') {
        vehicleInput.style.display = 'none';
        totalScuInput.style.display = 'inline';
        vehicleInput.value = '';
      } else if (mode.value === 'ship_name_automatic') {
        vehicleInput.style.display = 'inline';
        totalScuInput.style.display = 'none';
        totalScuInput.value = '';
      }

      calculateAndDisplay();
    }

    document.getElementById('scu_calculation').addEventListener('change', updateVisibility);
    document.getElementById('box-size').addEventListener('change', calculateAndDisplay);
    document.getElementById('total-scu').addEventListener('input', calculateAndDisplay);
    document.getElementById('id_vehicle').addEventListener('input', calculateAndDisplay);

    // Hide both inputs on page load
    window.addEventListener('DOMContentLoaded', () => {
      document.getElementById('id_vehicle').style.display = 'none';
      document.getElementById('total-scu').style.display = 'none';
    });

/*
function renderTable(data) {
  outputBody.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");

    const tdSize = document.createElement("td");
    tdSize.textContent = `${row.size} scu`;

    const tdCount = document.createElement("td");
    tdCount.textContent = row.count;
    tdCount.style.textAlign = "right";

    tr.appendChild(tdSize);
    tr.appendChild(tdCount);
    outputBody.appendChild(tr);
  });
}
*/




totalInput.addEventListener("input", calculateAndDisplay);
boxSizeSelect.addEventListener("change", calculateAndDisplay);
