<?php

namespace ProjectJournal\Entity;
/**
 * @Entity @Table(name="projects")
 **/
class Project
{

    /** @Id @Column(type="integer") @GeneratedValue **/
    protected $id;

    /** @Column(type="string") **/
    protected $title;

    /** @Column(type="integer") **/
    protected $category;

    /** @Column(type="string") **/
    protected $description;

    /** @Column(type="string") **/
    protected $image;

    /** @Column(type="datetime") **/
    protected $datestarted;

    /** @Column(type="datetime") **/
    protected $laststarted;

    /** @Column(type="integer") **/
    protected $time;

    /** @Column(type="integer") **/
    protected $status;

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getCategory()
{
    return $this->category;
}

    public function setCategory($category)
    {
        $this->category = $category;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function getDatestarted()
    {
        return $this->datestarted;
    }

    public function setDatestarted($datestarted)
    {
        $this->datestarted = $datestarted;
    }

    public function getLaststarted()
    {
        return $this->laststarted;
    }

    public function setLaststarted($laststarted)
    {
        $this->laststarted = $laststarted;
    }

    public function getTime()
    {
        return $this->time;
    }

    public function setTime($time)
    {
        $this->time = $time;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }
}

