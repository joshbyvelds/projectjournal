<?php

namespace ProjectJournal\Controller;

use Exception;
use ProjectJournal\Modal\TwigArray;
use ProjectJournal\Modal\PostArray;
use ProjectJournal\Services\DoctrineService;
use ProjectJournal\Controller\BaseController;

class Login extends BaseController
{
    public function logoutAction()
    {
        session_start();
        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(),'',0,'/');
        session_regenerate_id(true);
        header('Location: ' . "/");
    }

    public function indexAction()
    {
        return new TwigArray('login');
    }

    public function submitAction()
    {
        $response = [];
        $response['success'] = 1;

        try {


            // validate data
            if (!isset($_POST['username'])) {
                throw new Exception('Please enter the username for account.');
            }

            // validate data
            if (!isset($_POST['password'])) {
                throw new Exception('Please enter the password for your account.');
            }

            $username = $_POST["username"];
            $password = $_POST["password"];

            $d = new DoctrineService();
            $user = $d->getEntityManager()->getRepository('ProjectJournal\Entity\User')->findOneBy(array('username' => $username));
            //var_dump($user);

            if(isset($user)){
                if(password_verify($password, $user->getPassword())){
                    session_start();
                    $_SESSION['username'] = $user->getUsername();
                    $_SESSION['user_id'] = $user->getId();
                }else{
                    $json['error'] = true;
                    throw new Exception('Username and password do not match. Try again.');
                }
            }else{
                $json['error'] = true;
                throw new Exception('Username and password do not match. Try again.');
            }

            return new PostArray($response);

        } catch(\Exception $e) {
            $response['success'] = 0;
            $response['error'] = $e->getMessage();
            return new PostArray($response);
        }
    }
}
