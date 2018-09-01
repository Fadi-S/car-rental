<?php

namespace App\Http\Requests\ClientRequest;

use App\Http\Helpers\Slug;
use App\Models\Client\Client;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditClientRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "PATCH")
            return auth()->guard('admin')->user()->can("edit_client");

            return false;
    }

    public function rules()
    {
        return [

            'name' => "required",

            'username' => Rule::unique('clients')->ignore($this->route("admin")->id),

            'email' => [
                "required",
                "email",
                Rule::unique('clients')->ignore($this->route("admin")->id)
            ]

        ];
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();

        $user = $this->route("admin");
        if($user->name != $this->name)
            $data['username'] = Slug::createSlug(Client::class, ".", $this->name, "username");

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
