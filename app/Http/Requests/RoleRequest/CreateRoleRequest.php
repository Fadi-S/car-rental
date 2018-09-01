<?php

namespace App\Http\Requests\RoleRequest;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoleRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "POST")
            return auth()->guard('admin')->user()->can("add_role");

        return false;
    }

    public function rules()
    {

        return [

            'name' => "required|unique:roles",

            'permissions' => "required",

        ];

    }
}
