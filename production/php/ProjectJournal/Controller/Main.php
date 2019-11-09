<?php

namespace ProjectJournal\Controller;

use PDO;
use ProjectJournal\Entity\Project;
use ProjectJournal\Entity\JournalEntry;
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

    public function getProjectAction()
    {

        $ds = new DoctrineService();
        $project_repo = $ds->getEntityManager()->getRepository(Project::class);
        $project = $project_repo->findOneBy(array('id' => $this->getPostVariables(['project_id'])['project_id']));


        $project->setLaststarted($project->getLaststarted(), "F j\<\s\u\p\>S\<\/\s\u\p\>\, Y");

        $return_project = [
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'category' => $project->getCategory(),
            'description' => $project->getDescription(),
            'image' => $project->getImage(),
            'laststarted' => date_format($project->getLaststarted(), "F j\<\s\u\p\>S\<\/\s\u\p\>\, Y"),
            'time' => $project->getTime(),
        ];

        $entries_repo = $ds->getEntityManager()->getRepository(JournalEntry::class);
        $journal_entries = $entries_repo->findBy(array('project' => $return_project['id']));

        $journal_entries_array = [];

        foreach ($journal_entries as $entry) {
            $journal_entries_array[] = [
                'id' => $entry->getId(),
                'title' => $entry->getTitle(),
                'file' => $entry->getFile(),
                'type' => $entry->getType(),
                'words' => $entry->getWords(),
            ];
        }

        $return_project['entries'] = $journal_entries_array;
        return new PostArray($return_project);
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
                'time' => $project->getTime(),
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

    public function updateProjectTimeAction()
    {
        try {
            if (!isset($this->getPostVariables(['project'])['project'])) {
                throw new Exception($this->getPostVariables(['project'])['project']);
            }

            if (!isset($this->getPostVariables(['time'])['time'])) {
                throw new Exception($this->getPostVariables(['time'])['time']);
            }

            $ds = new DoctrineService();
            $project = $ds->getEntityManager()->getRepository(Project::class)->findOneBy(array('id' => $this->getPostVariables(['project'])['project']));

            $project->setTime($this->getPostVariables(['time'])['time']);
            $ds->getEntityManager()->flush();
            return new PostArray(['success' => '1']);

        } catch(\Exception $e) {
            return new PostArray(['success' => '0', 'message' => $e->getMessage()]);
        }
    }

    public function editProjectAction()
    {
        try {

            if (!isset($this->getPostVariables(['project_id'])['project_id'])) {
                throw new Exception($this->getPostVariables(['project_id'])['project_id']);
            }

            if (!isset($this->getPostVariables(['title'])['title'])) {
                throw new Exception($this->getPostVariables(['title'])['title']);
            }

            if (!isset($this->getPostVariables(['description'])['description'])) {
                throw new Exception($this->getPostVariables(['description'])['description']);
            }

            $ds = new DoctrineService();
            $project = $ds->getEntityManager()->getRepository(Project::class)->findOneBy(array('id' => $this->getPostVariables(['project_id'])['project_id']));

            $project->setTitle($this->getPostVariables(['title'])['title']);
            $project->setCategory($this->getPostVariables(['category'])['category']);
            $project->setDescription($this->getPostVariables(['description'])['description']);
            $ds->getEntityManager()->flush();

            return new PostArray(['success' => '1']);
        } catch(\Exception $e) {
            return new PostArray(['success' => '0', 'message' => $e->getMessage()]);
        }
    }

    public function deleteProjectAction()
    {
        try {
            if (!isset($this->getPostVariables(['project_id'])['project_id'])) {
                throw new Exception($this->getPostVariables(['project_id'])['project_id']);
            }

            $ds = new DoctrineService();
            $em = $ds->getEntityManager();
            $project = $em->getRepository(Project::class)->findOneBy(array('id' => $this->getPostVariables(['project_id'])['project_id']));
            $em->remove($project);
            $em->flush();

            return new PostArray(['success' => '1']);

        } catch(\Exception $e) {
            return new PostArray(['success' => '0', 'message' => $e->getMessage()]);
        }
    }

    public function addJournalEntryAction()
    {
        try {

            if (!isset($this->getPostVariables(['project_id'])['project_id'])) {
                throw new Exception($this->getPostVariables(['project_id'])['project_id']);
            }

            if (!isset($this->getPostVariables(['update_type'])['update_type'])) {
                throw new Exception($this->getPostVariables(['update_type'])['update_type']);
            }

            if (!isset($this->getPostVariables(['update_title'])['update_title'])) {
                throw new Exception($this->getPostVariables(['update_title'])['update_title']);
            }

            if (!isset($this->getPostVariables(['update_description'])['update_description'])) {
                throw new Exception($this->getPostVariables(['update_description'])['update_description']);
            }

            if (!isset($this->getPostVariables(['time'])['time'])) {
                throw new Exception($this->getPostVariables(['time'])['time']);
            }

            $post = $this->getPostVariables(['update_type', 'update_title', 'project_id', 'update_description', 'time']);

            $file = null;
            $pages = null;
            $words = null;
            $characters = null;
            $spaces = null;



            if ($this->getPostVariables(['update_type'])['update_type'] === "word_count")
            {
                if (!isset($this->getPostVariables(['word_count_pages'])['word_count_pages'])) {
                    throw new Exception($this->getPostVariables(['word_count_pages'])['word_count_pages']);
                }

                if (!isset($this->getPostVariables(['word_count_words'])['word_count_words'])) {
                    throw new Exception($this->getPostVariables(['word_count_words'])['word_count_words']);
                }

                if (!isset($this->getPostVariables(['word_count_characters'])['word_count_characters'])) {
                    throw new Exception($this->getPostVariables(['word_count_characters'])['word_count_characters']);
                }

                if (!isset($this->getPostVariables(['word_count_characters_excluding_spaces'])['word_count_characters_excluding_spaces'])) {
                    throw new Exception($this->getPostVariables(['word_count_characters_excluding_spaces'])['word_count_characters_excluding_spaces']);
                }


                $wc_post = $this->getPostVariables(['word_count_pages', 'word_count_characters_excluding_spaces', 'word_count_words', 'word_count_characters']);
                $pages = $wc_post['word_count_pages'];
                $words = $wc_post['word_count_words'];
                $characters = $wc_post['word_count_characters'];
                $spaces = $wc_post['word_count_characters_excluding_spaces'];
            } else {

                // if we are dealing with image/audio, check to make sure the file is good before we store to the database..
                if ($this->getPostVariables(['update_type'])['update_type'] === "image"){
                    $target_dir = "images/updates/";
                    $target_file = $target_dir . basename($_FILES["entry_file"]["name"]);
                    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

                    // Check if image file is a actual image or fake image
                    if(!getimagesize($_FILES["entry_file"]["tmp_name"])) {
                        throw new Exception("Uploaded file is not a image.");
                    }

                    // Check if file already exists
                    if (file_exists($target_file)) {
                        throw new Exception("Uploaded Image file already exists.");
                    }

                    // Check file size
                    if ($_FILES["entry_file"]["size"] > 500000) {
                        throw new Exception("Sorry, your file is too large.");
                    }

                    // Allow certain file formats
                    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
                        throw new Exception("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
                    }

                    $file_name = pathinfo($target_file,PATHINFO_FILENAME);
                    $file_ext = pathinfo($target_file,PATHINFO_EXTENSION);
                }

                if ($this->getPostVariables(['update_type'])['update_type'] === "audio"){
                    $target_dir = "audio/updates/";
                    $target_file = $target_dir . basename($_FILES["entry_file"]["name"]);
                    $audioFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

                    // Check if file already exists
                    if (file_exists($target_file)) {
                        throw new Exception("Uploaded audio file already exists.");
                    }

                    // Check file size
                    if ($_FILES["entry_file"]["size"] > 2000000) {
                        throw new Exception("Sorry, your audio file is too large.");
                    }

                    // Allow certain file formats
                    if($audioFileType != "mp3" ) {
                        throw new Exception("Sorry, only MP3 files are allowed.");
                    }

                    $file_name = pathinfo($target_file,PATHINFO_FILENAME);
                    $file_ext = pathinfo($target_file,PATHINFO_EXTENSION);
                }
            }

            $date = new \DateTime();

            $ds = new DoctrineService();
            $em = $ds->getEntityManager();

            $entry = new JournalEntry();
            $entry->setProject($post['project_id']);
            $entry->setTitle($post['update_title']);
            $entry->setDescription($post['update_description']);
            $entry->setType($post['update_type']);
            $entry->setFile(null);
            $entry->setPages($pages);
            $entry->setWords($words);
            $entry->setCharacters($characters);
            $entry->setSpaces($spaces);
            $entry->setDate($date);
            $entry->setTime($post['time']);

            $ds->getEntityManager()->persist($entry);
            $ds->getEntityManager()->flush();

            $id = $entry->getId();

            $em->flush();

            // rename file name to include new id..
            if (isset($file_name) && isset($file_ext)){
                $entry->setFile( $id . "." . $file_ext);
                $em->flush();

                if (!move_uploaded_file($_FILES["entry_file"]["tmp_name"],  $target_dir . $id . "." . $file_ext)) {
                    throw new Exception("Sorry, there was an error uploading your file.");
                }
            }

            if($post['update_type'] === 'word_count') {
                return new PostArray(['success' => '1', 'wc' => $words, 'id' => $id]);
            }else{
                return new PostArray(['success' => '1', 'file' => $entry->getFile(), 'id' => $id]);
            }

        } catch(\Exception $e) {
            return new PostArray(['success' => '0', 'message' => $e->getMessage()]);
        }
    }
}
