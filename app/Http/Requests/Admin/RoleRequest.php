<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "PATCH")
            return auth()->guard('admin')->user()->hasPermission("edit_role");
        else if($this->method() == "POST")
            return auth()->guard('admin')->user()->hasPermission("add_role");
        else
            return false;
    }

    public function rules()
    {
        $rules = [
            'name' => "required|unique:roles",
            'permissions' => "required",
        ];

        if($this->method() == "PATCH")
            $rules = [
                'name' => [
                    "required",
                    Rule::unique('roles')->ignore($this->route("role")->id)
                ],
                'permissions' => "required",
            ];

        return $rules;
    }
}
