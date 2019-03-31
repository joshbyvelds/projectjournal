<?php

namespace spec\ProjectJournal\Controller;

use ProjectJournal\Controller\Installer;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class InstallerSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(Installer::class);
    }

    function its_index_action_function_should_return_twig_array(){
        $this->indexAction()->shouldBeAnInstanceOf('ProjectJournal\Modal\TwigArray');
    }

    function its_submit_action_function_should_return_post_array(){
        $this->submitAction()->shouldBeAnInstanceOf('ProjectJournal\Modal\PostArray');
    }
}
