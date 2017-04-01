<?php
include("common.php");

$short = base_convert(get_path_from_url(), 36, 10);

$db = get_database_connection();

$stmt = $db->prepare("SELECT full FROM urls WHERE short=?");
$stmt->execute([$short]);

if($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //echo $result['full'];
    header('Location: '.$result['full']);
} else {
    ?><h1>No such short url</h1><?php
}