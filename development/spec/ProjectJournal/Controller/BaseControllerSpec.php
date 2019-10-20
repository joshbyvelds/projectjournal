<?php

namespace spec\ProjectJournal\Controller;

use ProjectJournal\Controller\BaseController;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Exception;

class BaseControllerSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(BaseController::class);
    }

    function its_post_function_should_return_a_error_message_if_key_does_not_have_variable()
    {
        $_POST = array();
        $testvar = 'test';
        //$this->shouldThrow(Exception::class)->during('getPostVariables', array(['test']));
        $this->getPostVariables([$testvar])->shouldBeArray();
        $this->getPostVariables([$testvar])->shouldHaveKeyWithValue('message','test post variable not set.');
    }

    function its_post_function_should_return_a_array()
    {
        $_POST['test'] = 'test';
        $testvar = 'test';
        $this->getPostVariables([$testvar])->shouldBeArray();
        $this->getPostVariables([$testvar])->shouldHaveKeyWithValue('test','test');
        $_POST['test'] = array();
    }
}
