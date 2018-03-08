<?php
/**
 * Created by PhpStorm.
 * User: JoshB
 * Date: 2/24/2018
 * Time: 7:58 PM
 */

require_once('db.php');

if(isset($_POST['id'])){
    $id = $_POST['id'];
}

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

if(empty($id)){
    $json['error'] = true;
    $json['error_message'] .= "Please select a project to update.\n";
}

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
    $sql = "UPDATE projects SET title=?, category=?, description=? WHERE id=?";
    $dbh->prepare($sql)->execute([$title, $category, $description, $id]);
    $json['success'] = true;
}
catch(PDOException $e) {
    $json['success'] = false;
    $json['error_message'] = $e->getMessage();
}

echo json_encode($json);
die();

