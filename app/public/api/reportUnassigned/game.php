<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from the helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT g.title, g.field, g.date, g.time, g.level FROM game AS g LEFT JOIN assignment AS a ON a.game_id = g.game_id WHERE g.level = "Low" GROUP BY g.game_id HAVING COUNT(a.referee_id) < 1 UNION SELECT g.title, g.field, g.date, g.time, g.level FROM game AS g LEFT JOIN assignment AS a ON a.game_id = g.game_id WHERE g.level = "Normal" GROUP BY g.game_id HAVING COUNT(a.referee_id) < 3 UNION SELECT g.title, g.field, g.date, g.time, g.level FROM game AS g LEFT JOIN assignment AS a ON a.game_id = g.game_id WHERE g.level = "High" GROUP BY g.game_id HAVING COUNT(a.referee_id) < 4;';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;