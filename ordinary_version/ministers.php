<?php
// ministers.php - CRUD operations for ministers
require 'db.php';

function getMinisters() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM ministers");
    return $stmt->fetchAll();
}

function addMinister($userId, $role, $designation) {
    global $pdo;
    $sql = "INSERT INTO ministers (user_id, role, designation) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$userId, $role, $designation]);
}

function deleteMinister($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM ministers WHERE id = ?");
    return $stmt->execute([$id]);
}
?>