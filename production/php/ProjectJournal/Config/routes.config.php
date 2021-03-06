<?php

return [
    /*
    'routename' => [
        'action' => '',
        'file' => '',
        'details' => [
            'id' => [
                'filter' => 'filterName',
            ],
        ],
    ],
    */

    '/' => [
        'controller' => 'main',
        'action' => 'index',
        'details' => [
            'id' => [
                'filter' => 'filterName',
            ],
        ],
    ],

    '/install' => [
        'controller' => 'installer',
        'action' => 'index',
        'details' => [],
    ],

    '/installsubmit' => [
        'controller' => 'installer',
        'action' => 'submit',
        'details' => [],
    ],

    '/login' => [
        'controller' => 'login',
        'action' => 'index',
        'details' => [],
    ],

    '/logout' => [
        'controller' => 'login',
        'action' => 'logout',
        'details' => [],
    ],

    '/loginsubmit' => [
        'controller' => 'login',
        'action' => 'submit',
        'details' => [],
    ],

    '/changelog' => [
        'controller' => 'changelog',
        'action' => 'index',
        'details' => [],
    ],

    '/jasmine' => [
        'controller' => 'jasmine',
        'action' => 'index',
        'details' => [],
    ],

    '/getprojects' => [
        'controller' => 'main',
        'action' => 'getProjects',
        'details' => [],
    ],

    '/getproject' => [
        'controller' => 'main',
        'action' => 'getProject',
        'details' => [],
    ],

    '/updateprojecttime' => [
        'controller' => 'main',
        'action' => 'updateProjectTime',
        'details' => [],
    ],

    '/addproject' => [
        'controller' => 'main',
        'action' => 'addProject',
        'details' => [],
    ],

    '/editproject' => [
        'controller' => 'main',
        'action' => 'editProject',
        'details' => [],
    ],

    '/deleteproject' => [
        'controller' => 'main',
        'action' => 'deleteProject',
        'details' => [],
    ],

    '/addjournalentry' => [
        'controller' => 'main',
        'action' => 'addJournalEntry',
        'details' => [],
    ],

    '/journalentry' => [
        'controller' => 'main',
        'action' => 'journalEntry',
        'details' => [],
    ],
]

?>
