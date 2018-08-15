<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CarRequest extends FormRequest
{

    public function authorize()
    {
        if($this->method() == "PATCH")
            return auth()->guard('admin')->user()->hasPermission("edit_car");
        else if($this->method() == "POST")
            return auth()->guard('admin')->user()->hasPermission("add_car");
        else
            return false;
    }


    public function rules()
    {
        return [
            "category_id" => "required|numeric|notIn:0",
            "edition_id" => "required|numeric|notIn:0",
            "type_id" => "required|numeric|notIn:0",
            "octane_id" => "required|numeric|notIn:0",
            "location_id" => "required|numeric|notIn:0",
            "price" => "required|numeric",
        ];
    }

}
