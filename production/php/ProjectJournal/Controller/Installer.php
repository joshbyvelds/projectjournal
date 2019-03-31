<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\TwigArray;
use ProjectJournal\Modal\PostArray;

class Installer
{
    public function indexAction()
    {
        return new TwigArray('install', []);
    }

    public function submitAction()
    {
        $response = [];
        return new PostArray($response);
    }
}
