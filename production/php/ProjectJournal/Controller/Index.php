<?php

namespace ProjectJournal\Controller;

class Index
{
    public function indexAction()
    {
        return ['type' => 'twig', 'file' => 'index', 'variables' => []];
    }
}
