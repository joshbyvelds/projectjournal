<?php

require_once '../vendor/autoload.php';
require_once 'php/ProjectJournal/Services/Router.php';

// Setup Twig..
$loader = new \Twig_Loader_Filesystem(__DIR__.'/views');
$twig = new \Twig_Environment($loader);

// Setup Controller..
$router = new ProjectJournal\Services\Router();
$current_route_URI = $_SERVER['REQUEST_URI'];

// TODO:: Move routes to config folder..
$router->route('/', function(){
    return ['file' => 'index', 'variables' => []];
});

$router->route('/projects', function(){
    return ['file' => 'projects', 'variables' => []];
});

////TODO:: check if route is in the config folder.. if not, throw 404..
//http_response_code(404);
//echo $twig->render('404.twig');
//die();

$route = $router->dispatch($current_route_URI);
echo $twig->render($route['file'] . '.twig');