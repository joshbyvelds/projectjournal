<?php

namespace spec\ProjectJournal\Controller;

use ProjectJournal\Controller\Main;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
Use Prophecy\Prophecy\ObjectProphecy;

class MainSpec extends ObjectBehavior
{
    function let()
    {
        $_POST = array();
    }

    function it_is_initializable()
    {
        $this->shouldHaveType(Main::class);
    }

    function its_index_action_function_should_return_twig_array()
    {
        $this->indexAction()->shouldBeAnInstanceOf('ProjectJournal\Modal\TwigArray');
    }

    function its_add_project_action_function_should_return_object_with_error_property_if_title_post_variable_is_missing()
    {
        $postArray = $this->addProjectAction();
        $postArray->shouldHaveKeyWithValue('success', '0');
        $postArray->shouldHaveKeyWithValue('message', 'title post variable not set.');
    }


    function its_add_project_action_function_should_return_object_with_error_property_if_category_post_variable_is_missing()
    {
        //$this->getPostVariables(['title'])->willReturn(['title' => 'title',])->shouldBeCalled();
        $_POST['title'] = "test";

        $postArray = $this->addProjectAction();
        $postArray->shouldHaveKeyWithValue('success', '0');
        $postArray->shouldHaveKeyWithValue('message', 'category post variable not set.');
    }

    function its_add_project_action_function_should_return_object_with_error_property_if_description_post_variable_is_missing()
    {
        //$this->getPostVariables(['title'])->willReturn(['title' => 'title',])->shouldBeCalled();
        //$this->getPostVariables(['category'])->willReturn(['category' => 'category',])->shouldBeCalled();

        $_POST['title'] = "test";
        $_POST['category'] = "test";

        $postArray = $this->addProjectAction();
        $postArray->shouldHaveKeyWithValue('success', '0');
        $postArray->shouldHaveKeyWithValue('message', 'description post variable not set.');
    }

    function its_add_project_action_function_should_return_object_with_error_property_if_title_is_blank(){
        $_POST['title'] = "";
        $_POST['category'] = "";
        $_POST['description'] = "";

        $postArray = $this->addProjectAction();
        $postArray->shouldHaveKeyWithValue('success', '0');
        $postArray->shouldHaveKeyWithValue('message', 'Please create a title for this new project');
    }

    function its_add_project_action_function_should_return_object_with_error_property_if_category_is_blank(){
        $_POST['title'] = "test";
        $_POST['category'] = "";
        $_POST['description'] = "";

        $postArray = $this->addProjectAction();
        $postArray->shouldHaveKeyWithValue('success', '0');
        $postArray->shouldHaveKeyWithValue('message', 'Please select a category for this new project');
    }

    function its_add_project_action_function_should_return_object_with_error_property_if_description_is_blank(){
        $_POST['title'] = "test";
        $_POST['category'] = "test";
        $_POST['description'] = "";

        $postArray = $this->addProjectAction();
        $postArray->shouldHaveKeyWithValue('success', '0');
        $postArray->shouldHaveKeyWithValue('message', 'Please write a description for this new project');
    }

    function its_add_project_action_function_should_return_post_array()
    {
//        $this->getPostVariables(['title', 'category', 'description'])->willReturn([
//            'title' => 'title',
//            'category' => 'test',
//            'description' => 'test',
//        ])->shouldBeCalled();

        $_POST['title'] = "test";
        $_POST['category'] = "test";
        $_POST['description'] = "test";

        $this->addProjectAction()->shouldBeAnInstanceOf('ProjectJournal\Modal\PostArray');
    }

    function its_add_project_action_function_should_return_object_with_success_property()
    {

//        $this->getPostVariables(['title', 'category', 'description'])->willReturn([
//            'title' => 'title',
//            'category' => 'test',
//            'description' => 'test',
//        ])->shouldBeCalled();

        $_POST['title'] = "test";
        $_POST['category'] = "test";
        $_POST['description'] = "test";

        $postArray = $this->addProjectAction();
        $postArray = $postArray->getPostData();
        $postArray->shouldHaveKey('success');
    }

    function its_add_project_action_function_should_return_object_with_id_property()
    {

//        $this->getPostVariables(['title', 'category', 'description'])->willReturn([
//            'title' => 'title',
//            'category' => 'test',
//            'description' => 'test',
//        ])->shouldBeCalled();

        $_POST['title'] = "test";
        $_POST['category'] = "test";
        $_POST['description'] = "test";

        $postArray = $this->addProjectAction();
        $postArray = $postArray->getPostData();
        $postArray->shouldHaveKey('id');
    }

    function its_add_project_action_function_should_return_object_with_title_property()
    {

//        $this->getPostVariables(['title', 'category', 'description'])->willReturn([
//            'title' => 'title',
//            'category' => 'test',
//            'description' => 'test',
//        ])->shouldBeCalled();

        $_POST['title'] = "test";
        $_POST['category'] = "test";
        $_POST['description'] = "test";

        $postArray = $this->addProjectAction();
        $postArray = $postArray->getPostData();
        $postArray->shouldHaveKey('title');
    }

    function its_add_project_action_function_should_return_object_with_date_property()
    {

//        $this->getPostVariables(['title', 'category', 'description'])->willReturn([
//            'title' => 'title',
//            'category' => 'test',
//            'description' => 'test',
//        ])->shouldBeCalled();

        $_POST['title'] = "test";
        $_POST['category'] = "test";
        $_POST['description'] = "test";

        $postArray = $this->addProjectAction();
        $postArray = $postArray->getPostData();
        $postArray->shouldHaveKey('date');
    }

    function its_add_project_action_function_should_return_object_with_time_spent_property()
    {
//        $this->getPostVariables(['title', 'category', 'description'])->willReturn([
//            'title' => 'title',
//            'category' => 'test',
//            'description' => 'test',
//        ])->shouldBeCalled();

        $_POST['title'] = "test";
        $_POST['category'] = "test";
        $_POST['description'] = "test";

        $postArray = $this->addProjectAction();
        $postArray = $postArray->getPostData();
        $postArray->shouldHaveKey('time_spent');
    }
}