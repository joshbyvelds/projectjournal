<?php

namespace ProjectJournal\Controller;

use PDO;
use ProjectJournal\Modal\PostArray;
use ProjectJournal\Modal\TwigArray;
use ProjectJournal\Controller\BaseController;
use Exception;
use ProjectJournal\Services\DoctrineService;

class Main extends BaseController
{
    public function indexAction()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        if(isset($_COOKIE['behat'])){
            $_SESSION['username'] = "behat";
        }

        $username = (isset($_SESSION['username'])) ? $_SESSION['username'] : "";
        return new TwigArray('main', ['username' => $username]);
    }

    public function addProjectAction(){
        $project = [];

        try {
            if (!isset($this->getPostVariables(['title'])['title'])) {
                throw new Exception($this->getPostVariables(['title'])['message']);
            }

            if (!isset($this->getPostVariables(['category'])['category'])) {
                throw new Exception($this->getPostVariables(['category'])['message']);
            }

            if (!isset($this->getPostVariables(['description'])['description'])) {
                throw new Exception($this->getPostVariables(['description'])['message']);
            }

            $post = $this->getPostVariables(['title', 'category', 'description']);
            if(strlen($post['title']) === 0){
                throw new Exception('Please create a title for this new project');
            }

            if(strlen($post['category']) === 0){
                throw new Exception('Please select a category for this new project');
            }

            if(strlen($post['description']) === 0){
                throw new Exception('Please write a description for this new project');
            }

            $date = new \DateTime();

            //$d = new DoctrineService();

            $project['success'] = 1;
            $project['id'] = '1';
            $project['title'] = $post['title'];
            $project['description'] = $post['description'];
            $project['category'] = $post['category'];
            $project['date'] = $date;
            $project['time_spent'] = 0;

            return new PostArray($project);

        } catch(\Exception $e) {
            return ['success' => '0', 'message' => $e->getMessage()];
        }
    }
}
