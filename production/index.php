<?php

use Doctrine\ORM\Tools\Setup;


require_once '../vendor/autoload.php';
require_once 'php/ProjectJournal/Services/Router.php';

// Setup Twig..
$loader = new \Twig_Loader_Filesystem(__DIR__.'/views');
$twig = new \Twig_Environment($loader);

// Setup Controller..
$config = new \ProjectJournal\Config\Config();
$router = new ProjectJournal\Services\Router($config->getRoutes());
$current_route_URI = $_SERVER['REQUEST_URI'];

// Setup Doctrine..
$isDevMode = true;
$doctrineConfig = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/php/ProjectJournal/Entity"), $isDevMode);

try{

    ////TODO:: check if route is in the config folder.. if not, throw 404..
    //http_response_code(404);
    //echo $twig->render('404.twig');
    //die();

    $route = $router->dispatch($current_route_URI);

    // Check for a bad route..
    if(empty($route->getType())){
        throw new \Exception('Action result does not have a type.');
    }

    // Check if app is installed..
    if($route->getType() === 'twig' && !file_exists ( 'php/ProjectJournal/Config/database.config.php' )) {
        $route = $router->dispatch("/install");
        echo $twig->render($route->getFile() . '.twig');
        exit();
    }


    if($route->getType() === 'twig'){
        echo $twig->render($route->getFile() . '.twig');
    }

    if($route->getType()=== 'post'){
        echo $route->getEncodedPostData();
    }

} catch(\Exception $e){
    http_response_code(404);
    echo $twig->render('404.twig', ['message' => $e->getMessage()]);
}