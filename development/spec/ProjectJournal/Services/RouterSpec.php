<?php

namespace spec\ProjectJournal\Services;

use ProjectJournal\Services\Router;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class RouterSpec extends ObjectBehavior
{

    function let()
    {
        $routes = ['test' =>  function(){return ['file' => 'index', 'variables' => []];}];
        $this->beConstructedWith($routes);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType(Router::class);
    }

//    function its_dispatch_function_should_throw_exception_if_callback_is_empty()
//    {
//        $this->shouldThrow(new \Exception("Router is trying to dispatch a route that does not exist."))->duringDispatch('');
//    }

    function its_dispatch_function_should_return_closer_object($routes){
        $this->dispatch('test')->shouldBeObject();
    }
}
