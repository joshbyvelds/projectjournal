<?php

namespace ProjectJournal\Controller;

use PDO;
use ProjectJournal\Entity\Project;
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
        $projects = [];

        // Get projects from DB
        if(isset($_SESSION['username'])) {
            $ds = new DoctrineService();
            $project_repo = $ds->getEntityManager()->getRepository(Project::class);
            $projects = $project_repo->findBy([], ['datestarted' => 'ASC']);

            foreach ($projects as $project) {
                $project->setLaststarted(date_format($project->getLaststarted(), "F j\<\s\u\p\>S\<\/\s\u\p\>\, Y"));
                $project->setTime($this->convertTimeSpent($project->getTime()));
            }
        }

        return new TwigArray('main', ['username' => $username, 'projects' => $projects]);
    }

    private function convertTimeSpent($seconds_left)
    {
        $hours = floor($seconds_left / (60 * 60));
        $seconds_left = $seconds_left % (60 * 60);

        $minutes = floor($seconds_left / 60);
        $seconds_left = $seconds_left % 60;

        $hours = ($hours <= 9) ? "0" . $hours : $hours;
        $minutes = ($minutes <= 9) ? "0" . $minutes : $minutes;
        $seconds = ($seconds_left <= 9) ? "0" . $seconds_left : $seconds_left;

        return $hours . ":" . $minutes . ":" . $seconds;
    }

    public function getProjectsAction()
    {
        $sort = 'id';
        $dir = 'ASC';

        if (isset($this->getPostVariables(['sort'])['sort'])) {
            $sort = $this->getPostVariables(['sort'])['sort'];
        }

        if (isset($this->getPostVariables(['dir'])['dir'])) {
            $dir = $this->getPostVariables(['dir'])['dir'];
        }

        $ds = new DoctrineService();
        $project_repo = $ds->getEntityManager()->getRepository(Project::class);
        $projects = $project_repo->findBy([], [$sort => $dir]);
        $projects_array = [];

        foreach ($projects as $project) {
            $projects_array[] = [
                'id' => $project->getId(),
                'title' => $project->getTitle(),
                'category' => $project->getCategory(),
                'description' => $project->getDescription(),
                'image' => $project->getImage(),
                'datestarted' => $project->getDateStarted(),
                'laststarted' => date_format($project->getLaststarted(), "F j\<\s\u\p\>S\<\/\s\u\p\>\, Y"),
                'time' => $this->convertTimeSpent($project->getTime()),
                'status' => $project->getStatus(),
            ];
        }

        return new PostArray($projects_array);
    }


    public function addProjectAction($phpspec = false){
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
            $id = 0;

            if(!$phpspec){
                $ds = new DoctrineService();

                $project = new Project();
                $project->setTitle($post['title']);
                $project->setCategory($post['category']);
                $project->setDescription($post['description']);
                $project->setImage("project_not_started.webp");
                $project->setDatestarted($date);
                $project->setLaststarted($date);
                $project->setTime(0);
                $project->setStatus(1);

                $ds->getEntityManager()->persist($project);
                $ds->getEntityManager()->flush();

                $id = $project->getId();
            }

            $project = [];
            $project['success'] = '1';
            $project['id'] = $id;
            $project['title'] = $post['title'];
            $project['description'] = $post['description'];
            $project['category'] = $post['category'];
            $project['laststarted'] = date_format($date,"F j\<\s\u\p\>S\<\/\s\u\p\>\, Y");
            $project['time'] = 0;
            $project['status'] = 1;

            return new PostArray($project);

        } catch(\Exception $e) {
            return new PostArray(['success' => '0', 'message' => $e->getMessage()]);
        }
    }
}
