<?php

namespace App\Http\Requests\RoleRequest;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditRoleRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->guard('admin')->user()->can("edit_role");
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
