const totalInput = document.getElementById("total-scu");
const suffix = document.getElementById("scu-suffix");
const boxSizeSelect = document.getElementById("box-size");
const outputBody = document.getElementById("output-body");

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

// Recalculate when input or dropdown changes
function calculateAndDisplay() {
  const total = parseInt(totalInput.value);
  const maxSize = parseInt(boxSizeSelect.value);
  if (isNaN(total) || total < 0) {
    outputBody.innerHTML = "";
    return;
  }

  const sizes = [32, 16, 8, 4, 2, 1];
  const allowedSizes = sizes.filter(size => size <= maxSize);
  const result = [];

  let remaining = total;
  for (let size of allowedSizes) {
    const count = Math.floor(remaining / size);
    result.push({ size, count });
    remaining %= size;
  }

  renderTable(result);
}

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

totalInput.addEventListener("input", calculateAndDisplay);
boxSizeSelect.addEventListener("change", calculateAndDisplay);
