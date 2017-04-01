<?php
include("common.php");

if($_GET['url']) {
    $url = $_GET['url'];
} else {
    $url = get_path_from_url();
}

echo $url;
$db = get_database_connection();

$db->exec("CREATE TABLE IF NOT EXISTS urls(short INTEGER PRIMARY KEY AUTOINCREMENT, full TEXT)");
$db->exec("CREATE UNIQUE INDEX IF NOT EXISTS full ON urls(full)");
$db->exec("CREATE UNIQUE INDEX IF NOT EXISTS short ON urls(short)");


$stmt = $db->prepare("SELECT short FROM urls WHERE full=?");
$stmt->execute([$url]);

if($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $short = $result['short'];
} else {
    $db->prepare("INSERT INTO urls(full) VALUES (?)")->execute([$url]);
    $short = $db->lastInsertId();
}

$shortened = "/short.php/".base_convert($short, 10, 36);
?>
<h1>
    <a href="<?= $shortened ?>"><?= $shortened ?></a>
</h1>

<form action="/shorten.php" onsubmit="return event.target.elements.url.value!=''">
    <input type="text" value="" name="url">
    <input type="Submit" value="Shorten">
</form>

