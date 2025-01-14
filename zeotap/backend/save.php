<?php
include 'db.php';

$name = $_POST['name'];
$data = $_POST['data'];

$sql = "INSERT INTO spreadsheets (name, data) VALUES ('$name', '$data')";
if ($conn->query($sql) === TRUE) {
    echo "Spreadsheet saved successfully!";
} else {
    echo "Error: " . $conn->error;
}
$conn->close();
?>
