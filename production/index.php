<?php

use Assetic\AssetWriter;
use Assetic\Asset\AssetCollection;
use Assetic\Asset\FileAsset;
use Assetic\Asset\GlobAsset;
use Assetic\AssetManager;

require_once '../vendor/autoload.php';
require_once 'php/ProjectJournal/Services/Router.php';

// Run Assetic

$css = new AssetCollection(array(
    new FileAsset(__DIR__.'/../development/yarn_components/ladda/dist/ladda.min.css'),
    new FileAsset(__DIR__.'/../development/yarn_components/@fortawesome/fontawesome-free/css/regular.min.css'),
    new FileAsset(__DIR__.'/../development/yarn_components/@fortawesome/fontawesome-free/css/solid.min.css'),
    new FileAsset(__DIR__.'/../development/yarn_components/@fortawesome/fontawesome-free/css/brands.min.css'),
    new FileAsset(__DIR__.'/../development/yarn_components/@fortawesome/fontawesome-free/css/fontawesome.min.css'),
    new FileAsset(__DIR__.'/../development/yarn_components/chart.js/dist/Chart.min.css'),
    new FileAsset(__DIR__.'/../development/yarn_components/jasmine-core/lib/jasmine-core/jasmine.css'),
    new FileAsset(__DIR__.'/../development/scss/compiled/master.css'),
));

$js = new AssetCollection(array(
    new FileAsset(__DIR__.'/../development/yarn_components/jquery/dist/jquery.min.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/ladda/dist/spin.min.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/ladda/dist/ladda.min.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/ladda/dist/ladda.jquery.min.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/velocity-animate/velocity.min.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/velocity-animate/velocity.ui.min.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/chart.js/dist/Chart.min.js'),
    new FileAsset(__DIR__.'/../development/javascript/jquery.ext.js'),
    new GlobAsset( __DIR__.'/../development/javascript/classes/*'),
    new FileAsset(__DIR__.'/../development/javascript/master.js'),
));

$jasmine = new AssetCollection(array(
    new FileAsset(__DIR__.'/../development/yarn_components/jasmine-core/lib/jasmine-core/jasmine.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/jasmine-core/lib/jasmine-core/jasmine-html.js'),
    new FileAsset(__DIR__.'/../development/yarn_components/jasmine-core/lib/jasmine-core/boot.js'),
));

$css->setTargetPath('master.css');
$css_am = new AssetManager();
$css_am->set('basecss', $css);

$js->setTargetPath('master.js');
$js_am = new AssetManager();
$js_am->set('basejs', $js);

$jasmine->setTargetPath('jasmine.js');
$jasmine_am = new AssetManager();
$jasmine_am->set('basejasmine', $jasmine);

$js_writer = new AssetWriter('javascript/');
$js_writer->writeManagerAssets($js_am);

$jasmine_writer = new AssetWriter('javascript/');
$jasmine_writer->writeManagerAssets($jasmine_am);

$css_writer = new AssetWriter('.');
$css_writer->writeManagerAssets($css_am);

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
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if(isset($_COOKIE['behat'])){
        $_SESSION['username'] = "behat";
    }

    if($route->getType() === 'twig' && !isset($_SESSION['username'])){
        $route = $router->dispatch("/login");
        echo $twig->render($route->getFile() . '.twig');
        exit();
    };

    if($route->getType() === 'twig'){
        echo $twig->render($route->getFile() . '.twig', $route->getVariables());
    }

    if($route->getType()=== 'post'){
        echo $route->getEncodedPostData();
    }

} catch(\Exception $e){
    http_response_code(404);
    echo $twig->render('404.twig', ['message' => $e->getMessage()]);
}