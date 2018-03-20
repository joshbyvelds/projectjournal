<?php

//Get all of our good Ol' composer stuff
require_once("vendor/autoload.php");
require_once("php/categories.php");

// Setup Twig cuz it's you know Awesome..
$loader = new \Twig_Loader_Filesystem(__DIR__.'/view');
$twig = new \Twig_Environment($loader);
$error = false;
$project = false;

if(isset($_GET['id'])){
    $project = $_GET['id'];
}else{
    $error = 'No project selected.';
}

// Twig vars go here. :)
echo $twig->render('project.twig',
    [
        'title' => 'Project Journal',
        'categories' => $categories,
        'error' => $error,
        'id' => $project,
    ]
);