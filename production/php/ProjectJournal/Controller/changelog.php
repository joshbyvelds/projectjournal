<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Controller\BaseController;
use ProjectJournal\Modal\TwigArray;

class Changelog extends BaseController
{
    public function indexAction()
    {
        return new TwigArray('changelog');
    }
}
