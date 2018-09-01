<?php

namespace App\Http\Requests\RoleRequest;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditRoleRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "PATCH")
            return auth()->guard('admin')->user()->can("edit_role");

        return false;
    }

    public function rules()
    {

        return [

            'name' => [
                "required",
                Rule::unique('roles')->ignore($this->route("role")->id)
            ],

            'permissions' => "required",
        ];

    }
}
