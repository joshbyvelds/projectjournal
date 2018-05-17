<?php

require_once('db.php');

if(isset($_POST['id'])){
    $id = $_POST['id'];
}

if(isset($_POST['status'])){
    $status = (int)$_POST['status'];
}


$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

if(empty($id)){
    $json['error'] = true;
    $json['error_message'] .= "Please select a task who status need to be updated.\n";
}

if(empty($status) && $status !== 0){
    $json['error'] = true;
    $json['error_message'] .= "current task status not found.\n";
}

if($json['error']){
    $json['success'] = false;
    echo json_encode($json);
    die();
}

$status = (int)$status + 1;

if($status === 3){$status = 0;}

try {
    $sql = "UPDATE subtasks SET status=? WHERE id=?";
    $dbh->prepare($sql)->execute([$status, $id]);
    $json['success'] = true;
    $json['status'] = $status;
}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error_message'] = $e->getMessage();
}

echo json_encode($json);
die();
