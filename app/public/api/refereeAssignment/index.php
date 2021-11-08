<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from the helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT g.title, g.field, g.date, g.time, g.level, a.status FROM game AS g, assignment AS a, referee AS r WHERE g.game_id = a.game_id AND a.referee_id = r.referee_id';
$vars = [];

if (isset($_GET['referee'])) {
    $sql = 'SELECT g.title, g.field, g.date, g.time, g.level, a.status FROM game AS g, assignment AS a, referee AS r WHERE g.game_id = a.game_id AND a.referee_id = r.referee_id AND a.referee_id = ?';
    $vars = [ $_GET['referee'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;