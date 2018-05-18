<?php

require_once('db.php');

if(isset($_POST['project'])){
    $project = $_POST['project'];
}

$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

if(empty($project)){
    $json['error'] = true;
    $json['success'] .= "Missing Project ID for stats.\n";
}

try{
    $sth = $dbh->prepare("SELECT date FROM updates WHERE project = ? ORDER BY id DESC");
    $sth->bindParam(1, $project);
    $sth->execute();
    $json['updates'] = $sth->fetchAll();


}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error'] = true;
    $json['error_message'] .= $e->getMessage();
}

echo json_encode($json);
