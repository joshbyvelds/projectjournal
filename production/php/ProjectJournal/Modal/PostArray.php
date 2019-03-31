<?php

namespace ProjectJournal\Modal;

use phpDocumentor\Reflection\Types\Boolean;

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

    public function getPostData(bool $encode): array
    {
        if($encode){
            return json_encode($this->postdata);
        }

        return $this->postdata;
    }
}
