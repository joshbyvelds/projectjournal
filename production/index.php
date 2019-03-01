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

    // Check if app is installed..
    if(!file_exists ( 'php/ProjectJournal/Config/Database.php' )) {
        $route = $router->dispatch("/install");
        echo $twig->render($route->getFile() . '.twig');
        exit();
    }

    $route = $router->dispatch($current_route_URI);

    if(empty($route['type'])){
        throw new \Exception('Action result does not have a type.');
    }

    if($route['type'] === 'twig'){
        echo $twig->render($route->getFile() . '.twig');
    }

} catch(\Exception $e){
    http_response_code(404);
    echo $twig->render('404.twig', ['message' => $e->getMessage()]);
}