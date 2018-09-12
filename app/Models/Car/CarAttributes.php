<?php

namespace App\Models\Car;


trait CarAttributes
{

    public function getCoverAttribute($path)
    {
        if(is_null($path) || $path == '' || !\Storage::exists($path)) {
            return url("images/defaultPicture.png");
        }
        return url(\Storage::url($path));
    }

}