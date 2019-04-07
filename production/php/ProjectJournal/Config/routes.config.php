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
        'controller' => 'index',
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

    '/loginsubmit' => [
        'controller' => 'login',
        'action' => 'submit',
        'details' => [],
    ],
]

?>
