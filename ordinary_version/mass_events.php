<?php
// mass_events.php - CRUD operations for mass events
require 'db.php';

function getMassEvents() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM mass_events");
    return $stmt->fetchAll();
}

function addMassEvent($title, $description, $eventDate, $location, $priestId) {
    global $pdo;
    $sql = "INSERT INTO mass_events (title, description, event_date, location, priest_id) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$title, $description, $eventDate, $location, $priestId]);
}

function deleteMassEvent($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM mass_events WHERE id = ?");
    return $stmt->execute([$id]);
}
?>