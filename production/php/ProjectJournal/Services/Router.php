<?php

namespace ProjectJournal\Services;

class Router
{
    private $routes;

    // TODO:: Delete constructor this if not used later..
    public function __construct($routes)
    {
        $this->routes = $routes;
    }

    public function route($action, $callback)
    {
        $action = trim($action, "/");
        $this->routes[$action] = $callback;
    }

    public function dumpRoutes(){
        //var_dump($this->routes);
    }

    public function dispatch($action)
    {
        $action = trim($action, "/");

        $this->dumpRoutes();

        if(!isset($routes[$action])){
            throw new \Exception('Router is trying to dispatch a route that does not exist. Route:' . $action);
        }

        $callback = $this->routes[$action];

        if(empty($callback)){
            throw new \Exception('Router is trying to dispatch a empty callback. Make sure the route has a action.');
        }

        return call_user_func($callback);
    }
}
