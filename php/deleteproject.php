<?php
/**
 * Created by PhpStorm.
 * User: JoshB
 * Date: 3/8/2018
 * Time: 6:55 PM
 */

require_once('db.php');

if(isset($_POST['project_id'])){
    $project_id = $_POST['project_id'];
}

$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

if(empty($project_id)){
    $json['error'] = true;
    $json['error_message'] .= "Please select a project to delete (missing id).\n";
}

if($json['error']){
    $json['success'] = false;
    echo json_encode($json);
    die();
}

try {
    $stmt = $dbh->prepare("DELETE FROM `projects` WHERE `id` = ?");
    $stmt->bindParam(1, $project_id);
    $stmt->execute();
}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error_message'] = $e->getMessage();
}

echo json_encode($json);
die();