<?php

namespace App\Http\Requests\Admin;

use App\Http\Helpers\Slug;
use App\Models\Client\Client;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "PATCH")
            return auth()->guard('admin')->user()->hasPermission("edit_client");
        else if($this->method() == "POST")
            return auth()->guard('admin')->user()->hasPermission("add_client");
        else
            return false;
    }

    public function rules()
    {
        if($this->method() == "PATCH") {
            $rules = [
                'name' => "required",
                'username' => Rule::unique('clients')->ignore($this->route("admin")->id),
                'email' => [
                    "required",
                    "email",
                    Rule::unique('clients')->ignore($this->route("admin")->id)
                ]
            ];
        }else {
            $rules = [
                'name' => "required",
                'username' => "required|unique:clients",
                'email' => "required|email|unique:clients",
            ];
        }

        return $rules;
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();
        if($this->method() == "POST") {
            $data['username'] = Slug::createSlug(Client::class, ".", $this->name, "username");
        }else if($this->method() == "PATCH") {
            $user = $this->route("admin");
            if($user->name != $this->name)
                $data['username'] = Slug::createSlug(Client::class, ".", $this->name, "username");
        }
        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
