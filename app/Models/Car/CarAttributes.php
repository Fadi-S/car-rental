<?php

namespace App\Models\Car;


use Carbon\Carbon;

trait CarAttributes
{

    public function getCoverAttribute($path)
    {
        $path = "public/photos/cars/" . $path;
        if(is_null($path) || $path == '' || !\Storage::exists($path))
            return url("images/defaultCar.jpg");

        return url(\Storage::url($path));
    }

    public function getTitleAttribute()
    {
        return $this->getField("model") . ' - ' . $this->getField("year");
    }

    public function getStatusShowAttribute()
    {
        if($this->status->name == "Sold")
            return $this->status->name;

        if($this->created_at->greaterThan(Carbon::now()->addWeeks(-1)))
            return "New";

        if($this->status->name == "Approved")
            return "";

        return $this->status->name;
    }

}