<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\TwigArray;

class Jasmine
{
    public function indexAction()
    {
        return new TwigArray('jasmine');
    }
}
