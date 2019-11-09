<?php

namespace ProjectJournal\Entity;
/**
 * @Entity @Table(name="journal_entries")
 **/
class JournalEntry
{

    /** @Id @Column(type="integer") @GeneratedValue **/
    protected $id;

    /** @Column(type="integer") **/
    protected $project;

    /** @Column(type="string") **/
    protected $title;

    /** @Column(type="string") **/
    protected $description;

    /** @Column(type="string") **/
    protected $type;

    /** @Column(type="string") **/
    protected $file;

    /** @Column(type="integer") **/
    protected $pages;

    /** @Column(type="integer") **/
    protected $words;

    /** @Column(type="integer") **/
    protected $characters;

    /** @Column(type="integer") **/
    protected $spaces;

    /** @Column(type="datetime") **/
    protected $date;

    /** @Column(type="integer") **/
    protected $time;

    public function getId()
    {
        return $this->id;
    }

    public function getProject()
    {
        return $this->project;
    }

    public function setProject($project)
    {
        $this->project = $project;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getFile()
    {
        return $this->file;
    }

    public function setFile($file)
    {
        $this->file = $file;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date)
    {
        $this->date = $date;
    }

    public function getTime()
    {
        return $this->time;
    }

    public function setTime($time)
    {
        $this->time = $time;
    }

    public function getPages()
    {
        return $this->pages;
    }

    public function setPages($pages)
    {
        $this->pages = $pages;
    }

    public function getWords()
    {
        return $this->words;
    }

    public function setWords($words)
    {
        $this->words = $words;
    }

    public function getCharacters()
    {
        return $this->characters;
    }

    public function setCharacters($characters)
    {
        $this->characters = $characters;
    }

    public function getSpaces()
    {
        return $this->spaces;
    }

    public function setSpaces($spaces)
    {
        $this->spaces = $spaces;
    }
}

