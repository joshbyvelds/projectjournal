<?php

namespace spec\ProjectJournal\Services;

use ProjectJournal\Services\Router;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class RouterSpec extends ObjectBehavior
{

    function let()
    {
        $routes = ['home' => ['action' => '/', 'file' => 'index', 'details' => ['id' => ['filter' => 'filterName',]]]];
        $this->beConstructedWith($routes);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType(Router::class);
    }

    function its_dispatch_function_should_throw_exception_if_callback_is_empty()
    {
        $this->shouldThrow(new \Exception("Router is trying to dispatch a route that does not exist."))->duringDispatch('badRoute');
    }

    function its_dispatch_function_should_return_closer_object(){
        $this->dispatch('/')->shouldBeArray();
    }
}
