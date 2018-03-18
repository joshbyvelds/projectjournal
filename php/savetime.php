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

if(isset($_POST['id'])){
    $id = $_POST['id'];
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

if(empty($id)){
    $json['error'] = true;
    $json['error_message'] .= "Missing project id.\n";
}

if(empty($seconds)){
    $json['error'] = true;
    $json['error_message'] .= "Missing project seconds.\n";
}

if(empty($minutes)){
    $json['error'] = true;
    $json['error_message'] .= "Missing project minutes.\n";
}

if(empty($hours)){
    $json['error'] = true;
    $json['error_message'] .= "Missing project hours.\n";
}

$time = $hours + '|' + $minutes + '|' + $seconds;
var_dump($hours);
var_dump($minutes);
var_dump($seconds);
var_dump($time);

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
