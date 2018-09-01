<?php

namespace App\Http\Requests\ClientRequest;

use App\Http\Helpers\Slug;
use App\Models\Client\Client;
use Illuminate\Foundation\Http\FormRequest;

class CreateClientRequest extends FormRequest
{
    public function authorize()
    {
        if($this->method() == "POST")
            return auth()->guard('admin')->user()->can("add_client");

        return false;
    }

    public function rules()
    {
        return $rules = [

            'name' => "required",

            'username' => "required|unique:clients",

            'email' => "required|email|unique:clients",

        ];
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();

        $data['username'] = Slug::createSlug(Client::class, ".", $this->name, "username");

        $this->getInputSource()->replace($data);

        return parent::getValidatorInstance();
    }
}
