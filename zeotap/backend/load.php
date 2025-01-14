<?php
include 'db.php';

$id = $_GET['id'];

$sql = "SELECT data FROM spreadsheets WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row['data'];
} else {
    echo "No data found.";
}
$conn->close();
?>
