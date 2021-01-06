<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Helpers\Slug;
use App\Models\Client\Client;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    use RegistersUsers;

    protected $redirectTo = '/';

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function showRegistrationForm()
    {
        return view('user.auth.register');
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'password' => 'required|string|min:6|confirmed',
            'terms' => 'accepted'
        ]);
    }

    protected function create(array $data)
    {
        $data['username'] = Slug::createSlug(Client::class, ".", $data["name"], "username");
        $data["serial"] = Client::max("serial") + 1;
        return Client::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'username' => $data["username"],
            'serial' => $data["serial"]
        ]);
    }
}
