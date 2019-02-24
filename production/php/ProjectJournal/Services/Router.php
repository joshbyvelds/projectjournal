<?php

namespace ProjectJournal\Services;

class Router
{
    private $routes;

    // TODO:: Delete constructor this if not used later..
    public function __construct(array $configRoutes)
    {
        // loop though config to add in routes..
        foreach($configRoutes as $routeName => $configRoute){
            $this->route($configRoute['action'], ['file' => 'index', 'variables' => []]);
        }
    }

    public function route($action, $callback)
    {
        $action = trim($action, "/");
        $this->routes[$action] = $callback;
    }

    public function dispatch($action)
    {
        $action = trim($action, "/");

        if(!isset($this->routes[$action])){
            throw new \Exception('Router is trying to dispatch a route that does not exist.');
        }

        $callback = $this->routes[$action];

        if(empty($callback)){
            throw new \Exception('Router is trying to dispatch a empty callback. Make sure the route has a action.');
        }

        return $callback;
    }
}
