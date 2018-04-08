<?php
/**
 * Created by PhpStorm.
 * User: JoshB
 * Date: 2/24/2018
 * Time: 7:58 PM
 */

require_once('db.php');

if(isset($_POST['project'])){
    $project = $_POST['project'];
}

if(isset($_POST['taskname'])){
    $taskname = $_POST['taskname'];
}

$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

if(empty($taskname)){
    $json['error'] = true;
    $json['error_message'] .= "Please enter a new for your new task.\n";
}

if($json['error']){
    $json['success'] = false;
    echo json_encode($json);
    die();
}

// Okay all errors handled GTG :)

try {
    $stmt = $dbh->prepare("INSERT INTO tasks (title, completed) VALUES (?, ?, 0)");
    $stmt->bindParam(1, $project);
    $stmt->bindParam(1, $taskname);
    $stmt->execute();
    $json['lastId'] = $dbh->lastInsertId();
}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error_message'] = $e->getMessage();
}

echo json_encode($json);
die();

