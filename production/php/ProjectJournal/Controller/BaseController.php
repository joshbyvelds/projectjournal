<?php

namespace ProjectJournal\Controller;
use Exception;

class BaseController
{
    public function getPostVariables(Array $keys)
    {
        $post = [];
        try{

            foreach ($keys as $key){
                if (isset($_POST[$key])){
                    $post[$key] = $_POST[$key];
                }else{
                    throw new Exception($key . ' post variable not set.');
                }
            }

            return $post;
        } catch(\Exception $e){
            return ['message' => $e->getMessage()];
        }
    }
}
