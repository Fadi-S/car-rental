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
        return auth()->guard('admin')->user()->can("edit_client");
    }

    public function rules()
    {
        return [

            'name' => "required",

            'username' => Rule::unique('clients')->ignore($this->route("client")->id),

            'email' => [
                "required",
                "email",
                Rule::unique('clients')->ignore($this->route("client")->id)
            ],

            'location_id' => "required|numeric|notIn:0",

            'area_id' => "required|numeric|notIn:0",
        ];
    }

    protected function getValidatorInstance()
    {
        $data = $this->all();

        $user = $this->route("client");
        if($user->name != $this->name)
            $data['username'] = Slug::createSlug(Client::class, ".", $this->name, "username");

        $this->getInputSource()->replace($data);
        return parent::getValidatorInstance();
    }
}
