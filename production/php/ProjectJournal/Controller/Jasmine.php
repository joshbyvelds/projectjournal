<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\TwigArray;
use ProjectJournal\Controller\BaseController;

class Jasmine extends BaseController
{
    public function indexAction()
    {
        return new TwigArray('jasmine');
    }
}
