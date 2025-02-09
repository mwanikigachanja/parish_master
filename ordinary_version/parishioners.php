<?php
// parishioners.php - CRUD operations for parishioners
require 'db.php';

function getParishioners() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM parishioners");
    return $stmt->fetchAll();
}

function addParishioner($firstName, $lastName, $email, $phone, $address, $baptismDate, $marriageDate) {
    global $pdo;
    $sql = "INSERT INTO parishioners (first_name, last_name, email, phone, address, baptism_date, marriage_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$firstName, $lastName, $email, $phone, $address, $baptismDate, $marriageDate]);
}

function deleteParishioner($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM parishioners WHERE id = ?");
    return $stmt->execute([$id]);
}
?>