<?php

namespace ProjectJournal\Services;

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use ProjectJournal\Config\Config;


class DoctrineService {

    private $config;
    private $dbConfig;
    private $entityManager;

    public function __construct()  {
        $this->dbConfig = new Config();
        $this->config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/../Entity"), false);
        $this->entityManager = EntityManager::create($this->dbConfig->getDatabase(), $this->config);
    }

    public function getEntityManager(){
        return $this->entityManager;
    }
}





