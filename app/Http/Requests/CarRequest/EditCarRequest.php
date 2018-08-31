<?php

namespace App\Http\Requests\CarRequest;

use Illuminate\Foundation\Http\FormRequest;

class EditCarRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "PATCH")
            return auth()->guard('admin')->user()->can("edit_car");

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
