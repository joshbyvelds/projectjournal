<?php
/**
 * Created by PhpStorm.
 * User: JoshB
 * Date: 3/18/2018
 * Time: 2:31 PM
 */

$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

require_once('db.php');

if(isset($_POST['project'])){
    $id = $_POST['project'];
}

if(isset($_POST['seconds'])){
    $seconds = $_POST['seconds'];
}

if(isset($_POST['minutes'])){
    $minutes = $_POST['minutes'];
}

if(isset($_POST['hours'])){
    $hours = $_POST['hours'];
}

if(empty($id) && (int)$id !== 0){
    $json['error'] = true;
    $json['error_message'] .= "Missing project id.\n";
}

if(empty($seconds) && (int)$seconds !== 0){
    $json['error'] = true;
    $json['error_message'] .= "Missing project seconds.\n";
}

if(empty($minutes) && (int)$minutes !== 0){
    $json['error'] = true;
    $json['error_message'] .= "Missing project minutes.\n";
}

if(empty($hours) && (int)$hours !== 0){
    $json['error'] = true;
    $json['error_message'] .= "Missing project hours.\n";
}

$time = $hours . '|' . $minutes . '|' . $seconds;


try {
    $stmt = $dbh->prepare("UPDATE projects SET time = ? WHERE id = ?");
    $stmt->bindParam(1, $time);
    $stmt->bindParam(2, $id);
    $stmt->execute();
}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error_message'] = $e->getMessage();
}

echo json_encode($json);
die();