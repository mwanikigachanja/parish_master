<?php
// Database connection
require_once 'db.php';

class ParishAdmin {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // CRUD for Users
    public function createUser($username, $password, $email, $role) {
        $hashPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->conn->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$username, $hashPassword, $email, $role]);
    }

    public function getUserById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateUser($id, $username, $email, $role) {
        $stmt = $this->conn->prepare("UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?");
        return $stmt->execute([$username, $email, $role, $id]);
    }

    public function deleteUser($id) {
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }

    // CRUD for Parishioners
    public function addParishioner($first_name, $last_name, $email, $phone, $address, $baptism_date, $marriage_date) {
        $stmt = $this->conn->prepare("INSERT INTO parishioners (first_name, last_name, email, phone, address, baptism_date, marriage_date) VALUES (?, ?, ?, ?, ?, ?, ?)");
        return $stmt->execute([$first_name, $last_name, $email, $phone, $address, $baptism_date, $marriage_date]);
    }

    public function getParishioners() {
        $stmt = $this->conn->query("SELECT * FROM parishioners");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // CRUD for Sacraments
    public function addSacrament($parishioner_id, $sacrament_type, $date, $certificate) {
        $stmt = $this->conn->prepare("INSERT INTO sacraments (parishioner_id, sacrament_type, date, certificate) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$parishioner_id, $sacrament_type, $date, $certificate]);
    }

    public function getSacraments() {
        $stmt = $this->conn->query("SELECT * FROM sacraments");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // CRUD for Donations
    public function addDonation($donor_id, $donation_type, $amount, $mpesa_reference) {
        $stmt = $this->conn->prepare("INSERT INTO donations (donor_id, donation_type, amount, mpesa_reference) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$donor_id, $donation_type, $amount, $mpesa_reference]);
    }

    public function getDonations() {
        $stmt = $this->conn->query("SELECT * FROM donations");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // CRUD for Attendance
    public function recordAttendance($event_id, $attendees_count) {
        $stmt = $this->conn->prepare("INSERT INTO attendance (event_id, attendees_count) VALUES (?, ?)");
        return $stmt->execute([$event_id, $attendees_count]);
    }

    public function getAttendance() {
        $stmt = $this->conn->query("SELECT * FROM attendance");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // CRUD for Bulletins
    public function addBulletin($title, $content, $author_id, $attachments) {
        $stmt = $this->conn->prepare("INSERT INTO bulletins (title, content, author_id, attachments) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$title, $content, $author_id, $attachments]);
    }

    public function getBulletins() {
        $stmt = $this->conn->query("SELECT * FROM bulletins");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

if ($_GET['action'] == "getMassEvents") {
    $stmt = $conn->query("SELECT * FROM mass_events");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($_GET['action'] == "getMinisters") {
    $stmt = $conn->query("SELECT id, designation FROM ministers");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($_GET['action'] == "addMassEvent") {
    $stmt = $conn->prepare("INSERT INTO mass_events (title, description, event_date, minister_id) VALUES (?, ?, ?, ?)");
    $result = $stmt->execute([$_POST['title'], $_POST['description'], $_POST['event_date'], $_POST['minister_id']]);
    echo json_encode(["success" => $result]);
    exit;
}

?>
