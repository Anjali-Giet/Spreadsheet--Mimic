const rows = 20;
const cols = 70;

window.onload = function () {
  const spreadsheet = document.getElementById('spreadsheet');
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.contentEditable = true;
    cell.setAttribute('data-id', `R${Math.floor(i / cols) + 1}C${(i % cols) + 1}`);
    spreadsheet.appendChild(cell);
  }
};

 function format(action) {
  const selectedCells = document.querySelectorAll('.cell.selected');
  selectedCells.forEach((cell) => {
    if (action === 'bold') {
      cell.style.fontWeight = (cell.style.fontWeight === 'bold') ? 'normal' : 'bold';
    }
    if (action === 'italic') {
      cell.style.fontStyle = (cell.style.fontStyle === 'italic') ? 'normal' : 'italic';
    }
    if (action === 'uppercase') {
      cell.textContent = cell.textContent.toUpperCase();
    }
    if (action === 'lowercase') {
      cell.textContent = cell.textContent.toLowerCase();
    }
  });
}


function applyFormula() {
  const formula = document.getElementById('formula').value;
  // Basic SUM example
  if (formula.startsWith('=SUM')) {
    const range = formula.match(/\((.*?)\)/)[1];
    const [start, end] = range.split(':');
    const startCell = document.querySelector(`[data-id='${start}']`);
    const endCell = document.querySelector(`[data-id='${end}']`);
    let sum = 0;
    let current = startCell;
    while (current && current !== endCell.nextElementSibling) {
      sum += parseFloat(current.textContent) || 0;
      current = current.nextElementSibling;
    }
    alert(`Sum: ${sum}`);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      cell.classList.toggle('selected'); // Toggle selection
    });
  });
});

function saveSpreadsheet() {
    const cells = document.querySelectorAll('.cell');
    const data = [];
    cells.forEach((cell) => data.push(cell.textContent));
  
    fetch('backend/save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=MySheet&data=${JSON.stringify(data)}`
    })
      .then((response) => response.text())
      .then((data) => alert(data));
  }
  
  function loadSpreadsheet(id) {
    fetch(`backend/load.php?id=${id}`)
      .then((response) => response.text())
      .then((data) => {
        const cells = JSON.parse(data);
        document.querySelectorAll('.cell').forEach((cell, index) => {
          cell.textContent = cells[index] || '';
        });
      });
  }
  function exportToXML() {
    const rows = document.querySelectorAll('#spreadsheet tr');
    let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n<spreadsheet>\n';
  
    rows.forEach((row, rowIndex) => {
      xmlData += `  <row index="${rowIndex + 1}">\n`;
  
      const cells = row.querySelectorAll('.cell');
      cells.forEach((cell, colIndex) => {
        const cellValue = cell.textContent.trim();
        xmlData += `    <cell column="${colIndex + 1}">${cellValue}</cell>\n`;
      });
  
      xmlData += '  </row>\n';
    });
  
    xmlData += '</spreadsheet>';
  
    // Create a Blob and trigger the download
    const blob = new Blob([xmlData], { type: 'text/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'spreadsheet.xml';
    link.click();
  }

  function importFromXML() {
    const fileInput = document.getElementById('importXML');
    const file = fileInput.files[0];
  
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(e.target.result, 'application/xml');
  
      // Clear current spreadsheet
      const spreadsheet = document.getElementById('spreadsheet');
      spreadsheet.innerHTML = '';
  
      // Parse rows and cells from XML
      const rows = xml.getElementsByTagName('row');
      Array.from(rows).forEach((row) => {
        const tr = document.createElement('tr');
        const cells = row.getElementsByTagName('cell');
        Array.from(cells).forEach((cell) => {
          const td = document.createElement('td');
          td.contentEditable = true; // Make cells editable
          td.className = 'cell';
          td.textContent = cell.textContent; // Set cell value
          tr.appendChild(td);
        });
        spreadsheet.appendChild(tr);
      });
    };
    reader.readAsText(file);
  }
  

  // document.addEventListener('DOMContentLoaded', () => {
  //   const spreadsheet = document.getElementById('spreadsheet');
  
  //   // Create a 5x5 grid
  //   for (let i = 0; i < 5; i++) {
  //     const row = document.createElement('tr');
  //     for (let j = 0; j < 5; j++) {
  //       const cell = document.createElement('td');
  //       cell.contentEditable = true; // Make cells editable
  //       cell.className = 'cell';
  //       row.appendChild(cell);
  //     }
  //     spreadsheet.appendChild(row);
  //   }
  // });

  function exportToCSV() {
    const rows = document.querySelectorAll('#spreadsheet tr');
    let csvData = '';
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll('.cell');
      const rowData = Array.from(cells).map((cell) => `"${cell.textContent.trim()}"`).join(',');
      csvData += rowData + '\n';
    });
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'spreadsheet.csv';
    link.click();
  }
  function importFromCSV() {
    const fileInput = document.getElementById('importCSV');
    const file = fileInput.files[0];
  
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const rows = e.target.result.split('\n');
  
      const spreadsheet = document.getElementById('spreadsheet');
      spreadsheet.innerHTML = '';
  
      rows.forEach((row) => {
        if (!row.trim()) return;
        const tr = document.createElement('tr');
        const cells = row.split(',');
        cells.forEach((cell) => {
          const td = document.createElement('td');
          td.contentEditable = true;
          td.className = 'cell';
          td.textContent = cell.replace(/^"|"$/g, ''); // Remove quotes
          tr.appendChild(td);
        });
        spreadsheet.appendChild(tr);
      });
    };
    reader.readAsText(file);
  }
    
  
    
  document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
  
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        cell.classList.toggle('selected'); // Toggle selection
      });
    });
  });
  
  function format(action) {
    const selectedCells = document.querySelectorAll('.cell.selected');
    selectedCells.forEach((cell) => {
      if (action === 'bold') cell.style.fontWeight = cell.style.fontWeight === 'bold' ? 'normal' : 'bold';
      if (action === 'italic') cell.style.fontStyle = cell.style.fontStyle === 'italic' ? 'normal' : 'italic';
      if (action === 'uppercase') cell.textContent = cell.textContent.toUpperCase();
      if (action === 'lowercase') cell.textContent = cell.textContent.toLowerCase();
    });
  }
  function applyFormula() {
    const formula = document.getElementById('formula').value;
    
    if (formula.startsWith('=SUM')) {
      const range = formula.match(/\((.*?)\)/)[1]; // Extract the range, e.g., A1:B2
      const [start, end] = range.split(':'); // Split start and end cells
      const startRow = parseInt(start.slice(1)) - 1; // Extract row index
      const startCol = start.charCodeAt(0) - 65; // Convert A-Z to 0-indexed
      const endRow = parseInt(end.slice(1)) - 1;
      const endCol = end.charCodeAt(0) - 65;
  
      let sum = 0;
      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          const cell = document.querySelector(`[data-id='R${r + 1}C${c + 1}']`);
          sum += parseFloat(cell.textContent) || 0;
        }
      }
  
      alert(`Sum: ${sum}`);
    }
  }
    