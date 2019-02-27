<?php

require_once '../vendor/autoload.php';
require_once 'php/ProjectJournal/Services/Router.php';

// Setup Twig..
$loader = new \Twig_Loader_Filesystem(__DIR__.'/views');
$twig = new \Twig_Environment($loader);

// Setup Controller..
$config = new \ProjectJournal\Config\Config();
$router = new ProjectJournal\Services\Router($config->getRoutes());
$current_route_URI = $_SERVER['REQUEST_URI'];


try{

    ////TODO:: check if route is in the config folder.. if not, throw 404..
    //http_response_code(404);
    //echo $twig->render('404.twig');
    //die();

    $route = $router->dispatch($current_route_URI);
    echo $twig->render($route['file'] . '.twig');
} catch(\Exception $e){
    echo $e->getMessage();
}