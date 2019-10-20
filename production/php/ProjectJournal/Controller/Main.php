<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\PostArray;
use ProjectJournal\Modal\TwigArray;
use ProjectJournal\Controller\BaseController;

class Main extends BaseController
{
    public function indexAction()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        if(isset($_COOKIE['behat'])){
            $_SESSION['username'] = "behat";
        }

        $username = (isset($_SESSION['username'])) ? $_SESSION['username'] : "";
        return new TwigArray('main', ['username' => $username]);
    }

}
