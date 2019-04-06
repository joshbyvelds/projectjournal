<?php

namespace ProjectJournal\Config;

class Config
{
    private $routes;
    private $database;

    public function __construct()
    {
        $this->routes = include_once "routes.config.php";
        $this->database = 0;

        if(file_exists ( 'database.config.php' )) {
            $this->database = include_once "database.config.php";
        }
    }

    public function getRoutes()
    {
        return $this->routes;
    }

    public function getDatabase()
    {

    }
}
