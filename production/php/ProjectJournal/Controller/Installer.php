<?php

namespace ProjectJournal\Controller;

use PDO;
use Exception;
use ProjectJournal\Modal\TwigArray;
use ProjectJournal\Modal\PostArray;
use Doctrine\ORM\EntityManager;

class Installer
{
    public function indexAction()
    {
        return new TwigArray('install', []);
    }

    public function submitAction()
    {
        $response = [];

        //$response['success'] = 1;

        try {

            // validate data
            if (!isset($_POST['db_host'])) {
                throw new Exception('Please enter name of database host address.');
            }

            if (!isset($_POST['db_name'])) {
                throw new Exception('Please enter name of database you wish to use.');
            }

            if (!isset($_POST['db_user'])) {
                throw new Exception('Please enter name of database user.');
            }

            if (!isset($_POST['db_pass'])) {
                throw new Exception('Please enter database user\'s password.');
            }

            if (!isset($_POST['admin_user'])) {
                throw new Exception('Please create a username for the admin user.');
            }

            if (!isset($_POST['admin_pass'])) {
                throw new Exception('Please create a password for the admin user.');
            }

            $db_host = $_POST["db_host"];
            $db_name = $_POST["db_name"];
            $db_user = $_POST["db_user"];
            $db_pass = $_POST["db_pass"];
            $admin_user = $_POST["admin_user"];
            $admin_pass = $_POST["admin_pass"];

            /*
            var_dump($db_host);
            var_dump($db_name);
            var_dump($db_user);
            var_dump($db_pass);
            var_dump($admin_user);
            var_dump($admin_pass);
            */

            // Create Database config file..
            $filename = 'php/ProjectJournal/Config/database.config.php';
            $content = "<?php\n\nreturn [\n    'dbname' => '" . $db_name . "',\n    'user' => '" . $db_user . "',\n    'password' => '" . $db_pass . "',\n    'host' => '" . $db_host . "',\n    'driver' => 'pdo_mysql'\n];";
            $handle = file_put_contents($filename, $content);

            // Create Database if selected

            if ($_POST['create_db']) {
                $dbh = new PDO("mysql:host=$db_host", $db_user, $db_pass);
                $dbh->exec("CREATE DATABASE `$db_name`;")
                or die(print_r($dbh->errorInfo(), true));
                $dbh = null;
            }

            $db = new PDO("mysql:dbname=$db_name;host=localhost", $db_user, $db_pass);

            // Create Table for Users
            $sql = "CREATE table users(
             id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
             username VARCHAR( 50 ) NOT NULL,
             password VARCHAR( 250 ) NOT NULL,
             role INT( 2 ) NOT NULL);";
            $db->exec($sql);

            // Create Table for Projects,
            $sql = "CREATE table projects(
             id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
             title VARCHAR( 50 ) NOT NULL,
             category VARCHAR( 250 ) NOT NULL,
             description VARCHAR( 5000 ) NOT NULL,
             image VARCHAR( 250 ) NOT NULL,
             laststarted DATETIME NOT NULL,
             time VARCHAR( 11 ) NOT NULL,
             status INT( 2 ) NOT NULL);";
            $db->exec($sql);

            // Create Table for Updates
            $sql = "CREATE table updates(
             id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
             project INT( 11 ) NOT NULL,
             title VARCHAR( 50 ) NOT NULL,
             details VARCHAR( 5000 ) NOT NULL,
             image VARCHAR( 100 ) NOT NULL,
             date DATETIME NOT NULL,
             time VARCHAR( 11 ) NOT NULL);";
            $db->exec($sql);


            // Create 'Admin' User..

            $admin_role = 2;
            $admin_password_hashed = password_hash($admin_pass, PASSWORD_DEFAULT);

            $stmt = $db->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
            $stmt->bindParam(1, $admin_user);
            $stmt->bindParam(2, $admin_password_hashed);
            $stmt->bindParam(3, $admin_role);
            $stmt->execute();


            return new PostArray($response);
        } catch(\Exception $e) {
            $response['error'] = $e->getMessage();
            return new PostArray($response);
        }
    }
}
