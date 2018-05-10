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

if(isset($_POST['task'])){
    $task = $_POST['task'];
}

if(isset($_POST['subtask'])){
    $subtask = $_POST['subtask'];
}

$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

if(empty($project)){
    $json['error'] = true;
    $json['error_message'] .= "Missing Project ID for task.\n";
}

if(empty($task)){
    $json['error'] = true;
    $json['error_message'] .= "Please select a task.\n";
}

if(empty($subtask)){
    $json['error'] = true;
    $json['error_message'] .= "Please enter a name new for your new subtask.\n";
}

if($json['error']){
    $json['success'] = false;
    echo json_encode($json);
    die();
}

// Okay all errors handled GTG :)

try {
    $stmt = $dbh->prepare("INSERT INTO subtasks (project, task, title, status) VALUES (?, ?, ?, 0)");
    $stmt->bindParam(1, $project);
    $stmt->bindParam(2, $task);
    $stmt->bindParam(3, $subtask);
    $stmt->execute();
    $json['lastId'] = $dbh->lastInsertId();
}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error_message'] = $e->getMessage();
}

echo json_encode($json);
die();