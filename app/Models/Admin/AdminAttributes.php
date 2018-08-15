<?php

namespace App\Models\Admin;

use App\Notifications\AdminResetPasswordNotification;

trait AdminAttributes
{

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new AdminResetPasswordNotification($token));
    }

}