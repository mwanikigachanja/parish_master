<?php
// db.php - Database connection file
$host = 'localhost';
$db   = 'parish_admin';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

?>

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
