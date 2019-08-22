<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\TwigArray;

class Main
{
    public function indexAction()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $username = (isset($_SESSION['username'])) ? $_SESSION['username'] : "";
        return new TwigArray('main', ['username' => $username]);
    }
}
