<?php

namespace spec\ProjectJournal\Modal;

use ProjectJournal\Modal\PostArray;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class PostArraySpec extends ObjectBehavior
{
    function let(){
        $this->beConstructedWith([]);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType(PostArray::class);
    }

    function its_get_type_function_should_return_string()
    {
        $this->getType()->shouldBeString();
    }

    function its_get_postdata_function_should_return_array()
    {
        $this->getPostdata()->shouldBeArray();
    }

    function its_get_encoded_postdata_function_should_return_string()
    {
        $this->getEncodedPostdata()->shouldBeString();
    }
}
