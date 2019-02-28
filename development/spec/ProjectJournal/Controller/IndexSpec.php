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
        $this->indexAction()->shouldBeArray();
    }

    function its_index_action_function_should_return_twig_array_with_type_property(){
        $twig_array = $this->indexAction();
        $twig_array->shouldHaveKey('type');
    }

    function its_index_action_function_should_return_twig_array_with_type_property_with_value_of_index(){
        $twig_array = $this->indexAction();
        $twig_array->shouldHaveKeyWithValue('type', 'twig');
    }

    function its_index_action_function_should_return_twig_array_with_file_property(){
        $twig_array = $this->indexAction();
        $twig_array->shouldHaveKey('file');
    }

    function its_index_action_function_should_return_twig_array_with_file_property_with_value_of_index(){
        $twig_array = $this->indexAction();
        $twig_array->shouldHaveKeyWithValue('file', 'index');
    }

    function its_index_action_function_should_return_twig_array_with_variables_property(){
        $twig_array = $this->indexAction();
        $twig_array->shouldHaveKeyWithValue('variables', []);
    }

    function its_index_action_function_should_return_twig_array_with_variables_property_with_value(){
        $twig_array = $this->indexAction();
        $twig_array->shouldHaveKeyWithValue('variables', []);
    }
}
