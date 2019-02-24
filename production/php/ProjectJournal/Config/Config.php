<?php

namespace ProjectJournal\Config;

class Config
{
    private $routes;

    public function __construct()
    {
        $this->routes = include_once "routes.config.php";
    }

    public function getRoutes()
    {
        return $this->routes;
    }
}
