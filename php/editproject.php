<?php
/**
 * Created by PhpStorm.
 * User: JoshB
 * Date: 2/24/2018
 * Time: 7:58 PM
 */

require_once('db.php');

if(isset($_POST['title'])){
    $title = $_POST['title'];

}
if(isset($_POST['category'])){
    $category = $_POST['category'];

}
if(isset($_POST['description'])){
    $description = $_POST['description'];
}

$json['error'] = false;
$json['success'] = true;
$json['error_message'] = '';

if(empty($title)){
    $json['error'] = true;
    $json['error_message'] .= "Please enter a title for your project.\n";
}

if(empty($category)){
    $json['error'] = true;
    $json['error_message'] .= "Please select a category for your project.\n";
}

if(empty($description)){
    $json['error'] = true;
    $json['error_message'] .= "Please enter a description of your project.\n";
}

if($json['error']){
    $json['success'] = false;
    echo json_encode($json);
    die();
}

// Okay all errors handled GTG :)

try {
    $stmt = $dbh->prepare("INSERT INTO projects (completed, title, category, description, time) VALUES (0, ?, ?, ?, 0)");
    $stmt->bindParam(1, $title);
    $stmt->bindParam(2, $category);
    $stmt->bindParam(3, $description);
    $stmt->execute();
    $json['lastId'] = $dbh->lastInsertId();
}
catch(PDOException $e) {
    echo $e->getMessage();//Remove or change message in production code
    $json['success'] = false;
}

echo json_encode($json);
die();

