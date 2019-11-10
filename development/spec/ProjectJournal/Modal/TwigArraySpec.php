<?php

namespace spec\ProjectJournal\Modal;

use ProjectJournal\Modal\TwigArray;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class TwigArraySpec extends ObjectBehavior
{
    function let(){
        $this->beConstructedWith( "test", []);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType(TwigArray::class);
    }

    function its_get_type_function_should_return_string()
    {
        $this->getType()->shouldBeString();
    }

    function its_get_file_function_should_return_string()
    {
        $this->getFile()->shouldBeString();
    }

    function its_get_variables_function_should_return_array()
    {
        $this->getVariables()->shouldBeArray();
    }


}
