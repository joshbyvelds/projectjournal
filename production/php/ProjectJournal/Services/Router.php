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

    /*
     * Add a new route to the class
     */
    public function route($url, $details)
    {
        $url = trim($url, "/");
        $this->routes[$url] = $details;
    }

    /*
     * Process the route request to a controller / action.
     */
    public function dispatch($url)
    {
        $url = trim($url, "/");
        $route = (isset($this->routes[$url])) ? $this->routes[$url] : NULL;

        if(empty($route)){
            throw new \Exception('Router is trying to dispatch a route that does not exist.');
        }

        $controller = $this->routes[$url]['controller'];
        $action = $this->routes[$url]['action'];

        if(empty($controller)){
            throw new \Exception('Router is trying to dispatch a route that does not have a controller.');
        }

        if(empty($action)){
            throw new \Exception('Router is trying to dispatch a route that does not have action.');
        }

        $details = (isset($this->routes[$url]['details'])) ? $this->routes[$url]['details'] : NULL;

        $class = '\ProjectJournal\Controller\\' . $controller;
        $actionFunction =  $action . 'Action';
        $classInstance = new $class();
        return $classInstance->$actionFunction($details);
    }
}
