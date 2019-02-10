<?php

require_once '../vendor/autoload.php';
require_once 'php/ProjectJournal/Services/Router.php';

// Setup Twig..
$loader = new \Twig_Loader_Filesystem(__DIR__.'/views');
$twig = new \Twig_Environment($loader);

// Setup Router..
$router = new ProjectJournal\Services\Router();
$current_route = $_SERVER['REQUEST_URI'];

// TODO:: Move routes to config folder..
$router->route('/', function(){
    return 'this is the homepage';
});

$router->route('/projects', function(){
    return 'this is the projects page';
});

//TODO:: check if route is in the config folder.. if not, throw 404..
http_response_code(404);
echo $twig->render('404.twig');
die();

$router->dispatch($current_route);

echo $twig->render('index.twig');