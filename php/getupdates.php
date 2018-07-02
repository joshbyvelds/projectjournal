<?php

require_once('db.php');
require_once("utilises.php");

$json = [];
$json['success'] = false;
$json['error'] = false;
$json['error_message'] = "";

if(isset($_POST['project'])){
    $project_id = $_POST['project'];
}

if(empty($project_id)){
    $json['error'] = true;
    $json['error_message'] .= "Missing Project ID for updates.\n";
}


if(!tableExists($dbh, "updates")){
    try {
        $sql = "CREATE table updates(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        project INT( 11 ) NOT NULL,
        title VARCHAR( 50 ) NOT NULL, 
        details VARCHAR (5000) NOT NULL,
        image VARCHAR (100),
        date DATETIME NOT NUll,
        time VARCHAR ( 11 ) NOT NUll);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        $json['error'] = true;
        $json['error_message'] = $e->getMessage();
    }
}

try{
    $sth = $dbh->prepare("SELECT * FROM updates WHERE project = ? ORDER BY id DESC");
    $sth->bindParam(1, $project_id);
    $sth->execute();
    $projects_array = $sth->fetchAll();

    date_default_timezone_set('America/Toronto');

    $updates = [];

    if(count($projects_array) > 0){
        foreach ($projects_array as $project){
            $projectObject = [];
            $dt = new DateTime($project['date']);
            $timeArray = explode('|', $project['time']);
            $projectObject['title'] = $project['title'];
            $projectObject['details'] = $project['details'];
            $projectObject['image'] = $project['image'];
            $projectObject['date'] = date("F j", $dt->getTimestamp()) ."<sup>". date("S", $dt->getTimestamp()) ."</sup>, ". date("Y", $dt->getTimestamp());
            $projectObject['time'] = sprintf('%02d', $timeArray[0]) . ":" . sprintf('%02d', $timeArray[1]) . ":" . sprintf('%02d', $timeArray[2]) ;
            $updates[] = $projectObject;
        }
    }

    $json['updates'] = $updates;
    $json['success'] = true;
}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error'] = true;
    $json['error_message'] .= $e->getMessage();
}

echo json_encode($json);