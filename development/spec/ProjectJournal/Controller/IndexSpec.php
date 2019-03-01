<?php

namespace spec\ProjectJournal\Controller;

use ProjectJournal\Controller\Index;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class IndexSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(Index::class);
    }

    function its_index_action_function_should_return_twig_array(){
        $this->indexAction()->shouldBeAnInstanceOf('ProjectJournal\Modal\TwigArray');
    }
}
