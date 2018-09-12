<?php
namespace App\Models\Car;


trait CarMethods
{

    public function creator()
    {
        return $this->adminLog()->where("message", '{"action":"add"}')->first()->admin;
    }

}