<?php

namespace App\Models\Admin;

use App\Notifications\AdminResetPasswordNotification;

trait AdminAttributes
{

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function getPictureAttribute($path)
    {
        if(is_null($path) || $path == '' || !\Storage::exists($path)) {
            return url("images/defaultPicture.png");
        }
        return url(\Storage::url($path));
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new AdminResetPasswordNotification($token));
    }

}