<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo;

    public function __construct()
    {
        $this->redirectTo = "/" . \Config::get("app.admin_url");
        $this->middleware('guest:admin')->except('logout');
    }

    public function showLoginForm()
    {
        return view('admin.auth.login');
    }

    public function username()
    {
        return 'login';
    }

    protected function attemptLogin(Request $request)
    {
        if (is_numeric($request->input($this->username())))
            $field = 'phone';
        else if (filter_var($request->input($this->username()), FILTER_VALIDATE_EMAIL))
            $field = 'email';
        else
            $field = "username";

        $request->merge([$field => $request->input('login')]);
        return $this->guard()->attempt(
            $request->only($field, 'password'), $request->filled('remember')
        );
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        return redirect($this->redirectTo);
    }

    protected function credentials(Request $request)
    {
        return array_merge($request->only($this->username(), 'password'), ["archived_at" => null]);
    }

    protected function guard()
    {
        return \Auth::guard("admin");
    }

}
