<?php

namespace ProjectJournal\Controller;

use ProjectJournal\Modal\TwigArray;

class Index
{
    public function indexAction()
    {
        return new TwigArray('index', []);
    }
}
