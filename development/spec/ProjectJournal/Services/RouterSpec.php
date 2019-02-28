<?php

namespace spec\ProjectJournal\Services;

use ProjectJournal\Services\Router;
use ProjectJournal\Controller\Index as Controller;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class RouterSpec extends ObjectBehavior
{

    function let()
    {
        $routes = [
            '/' => ['controller' => 'index', 'action' => 'index', 'file' => 'index', 'details' => ['id' => ['filter' => 'filterName',]]],
            'nocontroller' => ['nocontroller', 'controller' => '', 'action' => 'index', 'file' => 'index', 'details' => ['id' => ['filter' => 'filterName',]]],
            'noaction' => ['controller' => 'index', 'action' => '', 'file' => 'index', 'details' => ['id' => ['filter' => 'filterName',]]]
        ];
        $this->beConstructedWith($routes);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType(Router::class);
    }

    function its_dispatch_function_should_throw_exception_if_route_does_not_exist()
    {
        $this->shouldThrow(new \Exception("Router is trying to dispatch a route that does not exist."))->duringDispatch('badRoute');
    }

    function its_dispatch_function_should_throw_exception_if_route_does_not_have_a_controller()
    {
        $this->shouldThrow(new \Exception("Router is trying to dispatch a route that does not have a controller."))->duringDispatch('nocontroller');
    }

    function its_dispatch_function_should_throw_exception_if_route_does_not_have_a_action()
    {
        $this->shouldThrow(new \Exception("Router is trying to dispatch a route that does not have action."))->duringDispatch('noaction');
    }

    function its_dispatch_function_should_call_a_controller_action(Controller $controller)
    {

    }
}
