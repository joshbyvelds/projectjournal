<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\TwigArray;

class Installer
{
    public function indexAction()
    {
        return new TwigArray('installer', []);
    }
}
