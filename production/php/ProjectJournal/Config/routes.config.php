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

    '/jasmine' => [
        'controller' => 'jasmine',
        'action' => 'index',
        'details' => [],
    ],
]

?>
