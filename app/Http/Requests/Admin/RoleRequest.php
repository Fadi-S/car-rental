<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'name' => "required",
        ];
    }
}
