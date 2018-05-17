<?php

//Get all of our good Ol' composer stuff
require_once("vendor/autoload.php");
require_once("php/utilises.php");
require_once("php/db.php");
require_once("php/categories.php");

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
        image VARCHAR (100),
        time VARCHAR ( 11 ) NOT NUll);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        echo $e->getMessage();//Remove or change message in production code
    }
}

if(!tableExists($dbh, "startstop")){
    try {
        $sql = "CREATE table startstop(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        project INT(11) NOT NULL,
        time VARCHAR ( 11 ) NOT NUll,
        date DATETIME NOT NUll);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        echo $e->getMessage();//Remove or change message in production code
    }
}

try{
    $sth = $dbh->prepare("SELECT * FROM projects");
    $sth->execute();
    $projects_array = $sth->fetchAll();

    if(count($projects_array) > 0){
        foreach ($projects_array as $project){
            $projectObject = [];
            $timeArray = explode('|', $project['time']);
            $projectObject['id'] = $project['id'];
            $projectObject['completed'] = $project['completed'];
            $projectObject['title'] = $project['title'];
            $projectObject['category'] = $project['category'];
            $projectObject['seconds'] = sprintf('%02d', $timeArray[2]);
            $projectObject['minutes'] = sprintf('%02d', $timeArray[1]);
            $projectObject['hours'] = sprintf('%02d', $timeArray[0]);
            $projectObject['description'] = $project['description'];
            $projectObject['image'] = $project['image'];
            $projects[] = $projectObject;
        }
    }
}
catch(PDOException $e) {
    echo $e->getMessage();
}


// Finally lets render our templates..

// Twig vars go here. :)
echo $twig->render('index.twig',
    [
        'title' => 'Project Journal',
        'projects' => $projects,
        'categories' => $categories,
    ]
);