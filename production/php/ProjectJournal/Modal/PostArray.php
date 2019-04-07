<?php

namespace ProjectJournal\Modal;

class PostArray
{
    private $type = 'post';
    private $postdata;

    public function __construct(array $postdata)
    {
        $this->postdata = $postdata;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getPostData(): array
    {
        return $this->postdata;
    }

    public function getEncodedPostData(): string
    {
        return json_encode($this->postdata);
    }
}
