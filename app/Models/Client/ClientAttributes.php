<?php

namespace App\Models\Client;

use App\Notifications\ClientResetPasswordNotification;

trait ClientAttributes
{

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ClientResetPasswordNotification($token));
    }

    public function getPictureAttribute($path)
    {
        if(is_null($path) || $path == '' || !\Storage::exists($path)) {
            return url("images/defaultPicture.png");
        }
        return url(\Storage::url($path));
    }

}