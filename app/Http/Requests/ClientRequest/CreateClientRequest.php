<?php

namespace App\Http\Requests\ClientRequest;

use App\Http\Helpers\Slug;
use App\Models\Client\Client;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class CreateClientRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->guard('admin')->user()->can("add_client");
    }

    public function rules()
    {
        return [

            'name' => "required",

            'username' => "required|unique:clients",

            'email' => "required|email|unique:clients",

            'password' => "required|min:6|max:32",

            'location_id' => "required|numeric|notIn:0",

            'area_id' => "required|numeric|notIn:0",

        ];
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();

        $data['username'] = Slug::createSlug(Client::class, ".", $this->name, "username");

        $data["password"] = Str::random(6);

        $this->getInputSource()->replace($data);

        return parent::getValidatorInstance();
    }
}
