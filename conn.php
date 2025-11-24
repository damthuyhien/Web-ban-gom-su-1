<?php
$conn = new mysqli("localhost", "root", "", "dbwebbangomsu");
if ($conn->connect_error) {
    die("Lỗi kết nối DB: " . $conn->connect_error);
}
?>