<?php

//Get all of our good Ol' composer stuff
require_once("vendor/autoload.php");
require_once("php/utilises.php");
require_once("php/db.php");

// Setup Twig cuz it's you know Awesome..
$loader = new \Twig_Loader_Filesystem(__DIR__.'/view');
$twig = new \Twig_Environment($loader);

//setup time conversion in twig
function timeConvert ($seconds) {
    $t = round((int)$seconds);
    return sprintf('%02d:%02d:%02d', ((int)$t/3600),((int)$t/60%60), (int)$t%60);
};

$projects = [];

// Check if projects table exists in DB
if(!tableExists($dbh, "projects")){
    try {
        $sql = "CREATE table projects(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        completed INT(1) NOT NULL,
        title VARCHAR( 50 ) NOT NULL, 
        category VARCHAR( 250 ) NOT NULL,
        description VARCHAR (5000) NOT NULL,
        time INT( 11 ) NOT NUll);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        echo $e->getMessage();//Remove or change message in production code
    }
}else{
    try{
        $sth = $dbh->prepare("SELECT * FROM projects");
        $sth->execute();
        $projects_array = $sth->fetchAll();

        if(count($projects_array) > 0){
            foreach ($projects_array as $project){
                $projectObject = [];
                $projectObject['id'] = $project['id'];
                $projectObject['completed'] = $project['completed'];
                $projectObject['title'] = $project['title'];
                $projectObject['category'] = $project['category'];
                $projectObject['time'] = timeConvert($project['time']);
                $projectObject['description'] = $project['description'];
                $projects[] = $projectObject;
            }
        }
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
}

// Finally lets render our templates..

// Twig vars go here. :)
echo $twig->render('index.twig',
    [
        'title' => 'Project Journal',
        'projects' => $projects,
    ]
);