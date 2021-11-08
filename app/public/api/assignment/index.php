<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from the helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT a.assignment_id, a.referee_id, a.game_id, a.status, g.title, g.date ,g.level, r.first_name, r.last_name FROM assignment AS a, game AS g, referee AS r WHERE a.game_id = g.game_id AND a.referee_id = r.referee_id;';
$vars = [];

if (isset($_GET['game'])) {
    $sql = 'SELECT a.assignment_id, a.referee_id, a.game_id, a.status, g.title, g.date ,g.level, r.first_name, r.last_name FROM assignment AS a, game AS g, referee AS r WHERE a.game_id = g.game_id AND a.referee_id = r.referee_id AND a.game_id = ?';
    $vars = [ $_GET['game'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assignments = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($assignments, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;