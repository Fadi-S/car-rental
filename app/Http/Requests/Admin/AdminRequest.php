<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "PATCH")
            return auth()->guard('admin')->user()->hasPermission("edit_admin");
        else if($this->method() == "POST")
            return auth()->guard('admin')->user()->hasPermission("add_admin");
        else
            return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if($this->method() == "PATCH") {
            $rules = [
                'name' => "required",
                'username' => Rule::unique('admins')->ignore($this->route("admin")->id),
                'role_id' => "required|numeric|notIn:0",
                'email' => [
                    "required",
                    "email",
                    Rule::unique('admins')->ignore($this->route("admin")->id)
                ]
            ];
        }else {
            $rules = [
                'name' => "required",
                'username' => "required|unique:admins",
                'role_id' => "required|numeric|notIn:0",
                'email' => "required|email|unique:admins",
                'password' => "required|min:6",
                'location_id' => "required|numeric|notIn:0",
                "phone" => "required|unique:admins"
            ];
        }

        return $rules;
    }
}
