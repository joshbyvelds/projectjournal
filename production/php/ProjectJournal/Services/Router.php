<?php

namespace ProjectJournal\Services;

class Router
{
    private $routes;

    // TODO:: Delete constructor this if not used later..
    public function __construct()
    {

    }

    public function route($action, $callback)
    {
        $action = trim($action, "/");
        $this->routes[$action] = $callback;
    }

    public function dispatch($action)
    {
        $action = trim($action, "/");
        $callback = $this->routes[$action];
        return call_user_func($callback);
    }
}
