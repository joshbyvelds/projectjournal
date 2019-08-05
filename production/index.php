<?php

use Assetic\AssetWriter;
use Assetic\Asset\AssetCollection;
use Assetic\Asset\FileAsset;
use Assetic\Asset\GlobAsset;
use Assetic\AssetManager;

require_once '../vendor/autoload.php';
require_once 'php/ProjectJournal/Services/Router.php';

// Run Assetic

$js = new AssetCollection(array(
    new FileAsset(__DIR__.'/../development/bower_components/jquery/dist/jquery.min.js'),
    new FileAsset(__DIR__.'/../development/bower_components/ladda/dist/spin.min.js'),
    new FileAsset(__DIR__.'/../development/bower_components/ladda/dist/ladda.jquery.min.js'),
    new FileAsset(__DIR__.'/../development/bower_components/velocity/velocity.min.js'),
    new FileAsset(__DIR__.'/../development/bower_components/velocity/velocity.ui.min.js'),
    new GlobAsset( __DIR__.'/../development/javascript/classes/*'),
    new FileAsset(__DIR__.'/../development/javascript/master.js'),
));

$js->setTargetPath('master.js');
$am = new AssetManager();
$am->set('basejs', $js);

$writer = new AssetWriter('javascript/');
$writer->writeManagerAssets($am);

// Setup Twig..
$loader = new \Twig_Loader_Filesystem(__DIR__.'/views');
$twig = new \Twig_Environment($loader);

// Setup Controller..
$config = new \ProjectJournal\Config\Config();
$router = new ProjectJournal\Services\Router($config->getRoutes());
$current_route_URI = $_SERVER['REQUEST_URI'];

try{

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

    // Check if a user is logged in..
    session_start();
    if($route->getType() === 'twig' && !isset($_SESSION['username'])){
        $route = $router->dispatch("/login");
        echo $twig->render($route->getFile() . '.twig');
        exit();
    };

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