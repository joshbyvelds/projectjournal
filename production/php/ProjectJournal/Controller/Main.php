<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\TwigArray;

class Main
{
    public function indexAction()
    {
        return new TwigArray('main', []);
    }
}
