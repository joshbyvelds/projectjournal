<?php

require_once('db.php');
require_once("utilises.php");

if(!tableExists($dbh, "tasks")){
    try {
        $sql = "CREATE table tasks(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        project INT( 11 ) NOT NULL,
        title VARCHAR( 50 ) NOT NULL);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        $json['error'] = true;
        $json['error_message'] = $e->getMessage();
    }
}

if(!tableExists($dbh, "subtasks")){
    try {
        $sql = "CREATE table subtasks(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        project INT( 11 ) NOT NULL,
        task INT( 11 ) NOT NULL,
        title VARCHAR( 50 ) NOT NULL,
        status INT(4) NOT NULL);";
        $dbh->exec($sql);
    }
    catch(PDOException $e) {
        $json['error'] = true;
        $json['error_message'] = $e->getMessage();
    }
}

/*
 * Return Object Like this
 *
 * [
 *     {'taskname':'Create Basic shapes of Car',
 *         'subtasks': [
 *             {
 *                 'name': "wheels"
 *                 'status': 0,
*              },
 *
 *              {
 *                 'name': "hood"
 *                 'status': 0,
*              }
 *         ]
 *     },
 * ]
 */