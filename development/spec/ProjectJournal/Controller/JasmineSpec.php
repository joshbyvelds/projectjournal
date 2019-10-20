<?php

namespace spec\ProjectJournal\Controller;

use ProjectJournal\Controller\Jasmine;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class JasmineSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(Jasmine::class);
    }

    function its_index_action_function_should_return_twig_array(){
        $this->indexAction()->shouldBeAnInstanceOf('ProjectJournal\Modal\TwigArray');
    }
}
