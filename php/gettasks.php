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

if(!tableExists($dbh, "tasks")){
    try {
        $sql = "CREATE table tasks(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        project INT( 11 ) NOT NULL,
        title VARCHAR( 50 ) NOT NULL);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        $json['error'] = true;
        $json['error_message'] = $e->getMessage();
    }
}

if(!tableExists($dbh, "subtasks")){
    try {
        $sql = "CREATE table subtasks(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        project INT( 11 ) NOT NULL,
        task INT( 11 ) NOT NULL,
        title VARCHAR( 50 ) NOT NULL,
        status INT(4) NOT NULL);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        $json['error'] = true;
        $json['error_message'] = $e->getMessage();
    }
}

try {
    $sth = $dbh->prepare("SELECT * FROM tasks WHERE project = ? ORDER BY id");
    $sth->bindParam(1, $project_id);
    $sth->execute();
    $tasks = $sth->fetchAll(PDO::FETCH_ASSOC);

    $sth2 = $dbh->prepare("SELECT * FROM subtasks WHERE project = ? ORDER BY task");
    $sth2->bindParam(1, $project_id);
    $sth2->execute();
    $subtasks = $sth2->fetchAll(PDO::FETCH_ASSOC);

    foreach ($tasks as $key => $task)
    {
        $tasks[$key]["subtasks"] = [];
        foreach ($subtasks as $key2 => $subtask)
        {
            if($subtasks[$key2]["task"] === $tasks[$key]["id"]){
                $tasks[$key]["subtasks"][] = $subtasks[$key2];
            }
        }
    }
    $json["tasks"] = $tasks;
    $json['success'] = true;
}

catch(PDOException $e) {
    $json['success'] = false;
    $json['error'] = true;
    $json['error_message'] .= $e->getMessage();
}

echo json_encode($json);

/*
 * Return Object Like this
 *
 * [
 *     {
 *     'id': 2,
 *     'name':'Create Basic shapes of Car',
 *         'subtasks': [
 *             {
 *                 'name': "wheels"
 *                 'status': 0,
*              },
 *
 *              {
 *                 'name': "hood"
 *                 'status': 0,
*              }
 *         ]
 *     },
 * ]
 */
