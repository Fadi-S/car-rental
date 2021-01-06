<?php
namespace App\Models\Car;


use App\Models\Admin\Admin;
use App\Models\CarCategory\CarCategory;
use App\Models\CarEdition\CarEdition;
use App\Models\CarOctane\CarOctane;
use App\Models\CarType\CarType;
use App\Models\Location\Location;

trait CarMethods
{

    function getYoutubeEmbedUrl()
    {
        $url = $this->getField("youtube");
        $shortUrlRegex = '/youtu.be\/([a-zA-Z0-9_]+)\??/i';
        $longUrlRegex = '/youtube.com\/((?:embed)|(?:watch))((?:\?v\=)|(?:\/))(\w+)/i';

        if (preg_match($longUrlRegex, $url, $matches) || preg_match($shortUrlRegex, $url, $matches))
            $youtube_id = $matches[count($matches) - 1];
        else
            return "";

        return 'https://www.youtube.com/embed/' . $youtube_id;
    }

    public function getField($name)
    {
        $field = $this->fields()->where("name", $name)->first();
        if($field) {
            $field = $field->pivot->value;
            switch ($name) {
                case "location_id":
                    return Location::find($field);
                case "category_id":
                    return CarCategory::find($field);
                case "type_id":
                    return CarType::find($field);
                case "octane_id":
                    return CarOctane::find($field);
                case "edition_id":
                    return CarEdition::find($field);
                default:
                    return $field;
            }
        }
        return "";
    }

}