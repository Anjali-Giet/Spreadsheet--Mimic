<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Sheets Clone</title>
  <link rel="stylesheet" href="styles/style.css">
</head>
<body>
  <div id="toolbar">
  <button onclick="format('bold')">B</button>
<button onclick="format('italic')">I</button>
<button onclick="format('uppercase')">UPPER</button>
<button onclick="format('lowercase')">LOWER</button>

    <button onclick="removeDuplicates()">Remove Duplicates</button>
  </div>

  <div id="formula-bar">
    <input type="text" id="formula" placeholder="Enter formula (e.g., =SUM(A1:A5))">
    <button onclick="applyFormula()">Apply</button>
  </div>
  <div id="actions">
  <button onclick="saveSpreadsheet()">Save</button>
  <button onclick="loadSpreadsheet(1)">Load</button>
  <button onclick="exportToXML()">Export as XML</button>
  <button onclick="exportToCSV()">Export as CSV</button>
  <input type="file" id="importXML" accept=".xml" onchange="importFromXML()" style="display:none;">
  <button onclick="document.getElementById('importXML').click()">Import XML</button>
  <input type="file" id="importCSV" accept=".csv" onchange="importFromCSV()" style="display:none;">
  <button onclick="document.getElementById('importCSV').click()">Import CSV</button>
</div>


  <div id="spreadsheet">
    <!-- Dynamic grid will be created with JS -->
  </div>

  <script src="scripts/main.js"></script>
</body>
</html>
