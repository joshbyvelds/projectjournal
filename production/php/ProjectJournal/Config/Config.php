<?php

namespace ProjectJournal\Config;

class Config
{
    private $routes;
    private $database;

    public function __construct()
    {
        $this->routes = include "routes.config.php";
        $this->database = 0;
        if(file_exists ( __DIR__ . '/database.config.php' )) {
            $this->database = include "database.config.php";
        }
    }

    public function getRoutes()
    {
        return $this->routes;
    }

    public function getDatabase()
    {
        return $this->database;
    }
}
