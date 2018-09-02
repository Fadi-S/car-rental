<?php

namespace App\Http\Requests\AdminRequest;

use App\Http\Helpers\Slug;
use App\Models\Admin\Admin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditAdminRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->guard('admin')->user()->can("edit_admin");
    }

    public function rules()
    {
        return [
            'name' => "required",
            'username' => Rule::unique('admins')->ignore($this->route("admin")->id),
            'role_id' => "required|numeric|notIn:0",
            'email' => [
                "required",
                "email",
                Rule::unique('admins')->ignore($this->route("admin")->id)
            ]
        ];
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();

        $user = $this->route("admin");
        if($user->name != $this->name)
            $data['username'] = Slug::createSlug(Admin::class, ".", $this->name, "username");

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
