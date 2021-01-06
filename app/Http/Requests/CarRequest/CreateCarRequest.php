<?php

namespace App\Http\Requests\CarRequest;

use Illuminate\Foundation\Http\FormRequest;

class CreateCarRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->guard('admin')->user()->can("add_car");
    }


    public function rules()
    {
        return [

            "fields.category_id" => "required|numeric|notIn:0",

            "fields.edition_id" => "required|numeric|notIn:0",

            "fields.type_id" => "required|numeric|notIn:0",

            "fields.octane_id" => "required|numeric|notIn:0",

            "fields.location_id" => "required|numeric|notIn:0",

            "fields.price" => "required|numeric",

            "client_id" => "required|numeric|notIn:0",

            "status_id" => "required|numeric|notIn:0",

            "cover" => "image",

        ];
    }
}
