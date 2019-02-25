<?php

namespace ProjectJournal\Services;

class Router
{
    private $routes;

    public function __construct(array $configRoutes)
    {
        // loop though config to add in routes..
        foreach($configRoutes as $routeName => $configRoute){
            $this->route($routeName, ['controller' => $configRoute['controller'], 'action' => $configRoute['action'], 'details' => $configRoute['details']]);
        }
    }

    public function route($url, $details)
    {
        $url = trim($url, "/");
        $this->routes[$url] = $details;
    }

    public function dispatch($action)
    {
        $action = trim($action, "/");

       // var_dump($this->routes[$action]);

        if(!isset($this->routes[$action])){
            throw new \Exception('Router is trying to dispatch a route that does not exist.');
        }

        if(empty($this->routes[$action]['controller'])){
            throw new \Exception('Router is trying to dispatch a route that does not have a controller.');
        }

        if(empty($this->routes[$action]['action'])){
            throw new \Exception('Router is trying to dispatch a route that does not have action.');
        }


        $callback = $this->routes[$action];

        if(empty($callback)){
            throw new \Exception('Router is trying to dispatch a empty callback. Make sure the route has a action.');
        }

        return $callback;
    }
}
