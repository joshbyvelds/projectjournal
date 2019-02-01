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

if(isset($_POST['stop'])){
    $stop = $_POST['stop'];
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
$date = date("Y-m-d H:i:s");

try {
    $stmt = $dbh->prepare("UPDATE projects SET time = ?, laststarted = ? WHERE id = ?");
    $stmt->bindParam(1, $time);
    $stmt->bindParam(2, $date);
    $stmt->bindParam(3, $id);
    $stmt->execute();

    if($stop === "true"){
        $stmt = $dbh->prepare("INSERT into startstop (project, time, date) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $id);
        $stmt->bindParam(2, $time);
        $stmt->bindParam(3, $date);
        $stmt->execute();
    }

}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error_message'] = $e->getMessage();
}

echo json_encode($json);
die();