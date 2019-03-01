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
]

?>
