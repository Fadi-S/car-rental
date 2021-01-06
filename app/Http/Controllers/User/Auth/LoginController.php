<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = '/';

    public function __construct()
    {
        $this->middleware('guest')->except(['logout', 'changePassword', 'showChangePasswordForm']);
    }

    public function showLoginForm()
    {
        return view('user.auth.login');
    }

    public function showChangePasswordForm()
    {
        return view('user.auth.changePassword');
    }

    public function changePassword(Request $request, MessageBag $messageBag)
    {
        $user = auth()->user();
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|confirmed|min:6'
        ]);

        if(\Hash::check($request->old_password, $user->password)) {
            $user->password = $request->new_password;
            $user->save();
            flash()->success("Password Changed Successfully");
        }else
            $messageBag->add("wrong_password", "Old Password doesn't match!");

        return redirect("/change-password")->withErrors($messageBag);
    }
}
