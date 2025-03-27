<?php
include 'db_config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

if ($action == "create") {
    $student_id = $_POST['student_id'];
    $name = $_POST['name'];
    $conn->query("INSERT INTO students (student_id, name) VALUES ('$student_id', '$name')");
} elseif ($action == "read") {
    $result = $conn->query("SELECT * FROM students");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
} elseif ($action == "update") {
    $student_id = $_POST['student_id'];
    $name = $_POST['name'];
    $conn->query("UPDATE students SET name='$name' WHERE student_id=$student_id");
} elseif ($action == "delete") {
    $student_id = $_POST['student_id'];
    $conn->query("DELETE FROM students WHERE student_id=$student_id");
}

$conn->close();
?>