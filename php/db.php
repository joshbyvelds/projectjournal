<?php
/**
 * Created by PhpStorm.
 * User: JoshB
 * Date: 2/21/2018
 * Time: 8:45 PM
 */

try {
    $dbh = new PDO('mysql:host=localhost;dbname=project_journal', "root", "");
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}