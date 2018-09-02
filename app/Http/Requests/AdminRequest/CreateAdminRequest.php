<?php

namespace App\Http\Requests\AdminRequest;

use App\Http\Helpers\Slug;
use App\Models\Admin\Admin;
use Illuminate\Foundation\Http\FormRequest;

class CreateAdminRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->guard('admin')->user()->can("add_admin");
    }

    public function rules()
    {
        return [
            'name' => "required",
            'username' => "required|unique:admins",
            'role_id' => "required|numeric|notIn:0",
            'email' => "required|email|unique:admins",
            'password' => "required|min:6",
            'location_id' => "required|numeric|notIn:0",
            "phone" => "required|unique:admins"
        ];
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();
            $data['username'] = Slug::createSlug(Admin::class, ".", $this->name, "username");

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
