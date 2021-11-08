<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from the helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
if (isset($_GET['referee_id'])) {
    $sql = 'SELECT g.title, g.field, g.date, g.time, g.level FROM game AS g, assignment AS a WHERE (g.game_id = a.game_id AND a.referee_id = ?) AND (date BETWEEN ? AND ?)';
    $vars = [ $_GET['referee_id'],$_GET['minDate'],$_GET['maxDate']];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "Game_Title,Game_Field,Game_Date,Game_Time,Game_Level\r\n";

  foreach($games as $g) {
    echo $g['title'] . "," .$g['field'] . "," .$g['date'] . "," .$g['time'] . "," .$g['level'] . "\r\n";
  }

} else {

// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
}